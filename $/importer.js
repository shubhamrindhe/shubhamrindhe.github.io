const MODULES_CACHE = {}, EXPORTER_CACHE = {}
const EXPORT_FILE_NAME = 'export.js', PATH_2_ROOT = './..'

export default class Importer {

	constructor(root, exportMapKey = 'default') {
		this.root = root;
		this.exportMapKey = exportMapKey;
		this.modulePaths = null;
		this.modules = {};
		this.finalCallback = null;
		this.modulesToImport = null;
		this.importedModules = null;
		this.importHandlers = null;
		this.errorHandler = null;
		this.subscribers = [];
	}

	get exportPath() { return `${this.basePath}/${EXPORT_FILE_NAME}`; }
	get basePath() { return `${PATH_2_ROOT}/${this.root}`; }
	get allFetched() { return this.modulesToImport.size == this.importedModules.size; }

	addSubscriber(subscriber) {
		this.subscribers.push(subscriber);
	}

	static seek(rootKey, moduleKey) {
		if (rootKey in MODULES_CACHE) {
			const root = MODULES_CACHE[rootKey];
			if (moduleKey in root) return root[moduleKey];
			return root
		}
		return null;
	}

	static cache(rootKey, moduleKey, module) {
		if (!MODULES_CACHE[rootKey]) MODULES_CACHE[rootKey] = {};
		MODULES_CACHE[rootKey][moduleKey] = module;
	}

	async importModuleWithKey(key) {
		const cachedModule = Importer.seek(this.root, key);
		if (cachedModule) {
			if (!(key in this.modules)) this.modules[key] = cachedModule;
			if (!this.importedModules.has(key)) this.importedModules.add(key);
			this.notifySubscribersModuleImported(key, cachedModule);
			return;
		}

		const relativePath = this.modulePaths[key];
		import(`${this.basePath}${relativePath}`)
			.then(module => { this.handleImportedModule(key, module) })
			.catch(error => {
				console.error(error, new Error(`file not found in ${this.root}${relativePath}`))
				if (this.errorHandler instanceof Function) { this.errorHandler(key, error) }
			});
	}

	handleImportedModule(key, module) {
		this.modules[key] = module;
		this.importedModules.add(key);
		Importer.cache(this.root, key, module);

		this.notifySubscribersModuleImported(key, module);
	}

	notifySubscribersModuleImported(key, module) {
		if (this.importHandlers) {
			if (this.importHandlers[key] instanceof Function) {
				this.importHandlers[key](module);
			}
		}

		this.subscribers.forEach((e, i, l) => {
			if (e.moduleImported instanceof Function) {
				e.moduleImported(this.root, key, module);
			}
		});

		if (this.allFetched) {
			if (this.finalCallback instanceof Function) this.finalCallback(this.modules);
			this.subscribers.forEach((e, i, l) => { if (e.allModulesImported instanceof Function) e.allModulesImported(this.root, this.modules); });
		}
	}

	beginImport(moduleData, finalCallback) {
		this.importedModules = new Set();
		if (moduleData instanceof Array) {
			this.modulesToImport = new Set(moduleData);
		} else if (moduleData instanceof Object) {
			this.importHandlers = moduleData;
			this.modulesToImport = new Set(Object.keys(moduleData));
		}

		if (finalCallback instanceof Function) { this.finalCallback = finalCallback }
	}

	async import(moduleData, finalCallback = null) {
		try {
			const exportData = await import(this.exportPath);
			this.modulePaths = exportData[this.exportMapKey];
			this.beginImport(moduleData, finalCallback);
			this.modulesToImport.forEach(key => { this.importModuleWithKey(key); });
		} catch (error) { console.log(error); }
	}
};

export class MUX {

	constructor(...importers) {
		this.importers = importers;
		this.importerKeySet = new Set();
		this.importedSet = new Set();
		this.importers.forEach((importer, i, l) => {
			importer.addSubscriber(this);
			this.importerKeySet.add(importer.root);
		});

		this.moduleImportHandler = null;
		this.completionHandler = null;
	}

	add(importer) {
		if (this.importerKeySet.has(importer.root)) return;
		importer.addSubscriber(this);
		this.importers.push(importer);
		this.importerKeySet.add(importer.root);
	}

	get allFetched() { return this.importerKeySet.size == this.importedSet.size; }
	get modules() {
		let _modules_ = {};
		this.importers.forEach((importer) => { _modules_[importer.root] = importer.modules; });
		return _modules_;
	}

	moduleImported(rootKey, moduleKey, module) {
		const moduleImportData = { rootKey, moduleKey, module };
		if (this.moduleImportHandler instanceof Function) this.moduleImportHandler(moduleImportData);
	}

	allModulesImported(rootKey, modules) {
		this.importedSet.add(rootKey);
		if (this.allFetched && this.completionHandler instanceof Function) this.completionHandler(this.modules);
	}
};

export class MUXEDImporter {

	constructor(...rootKeys) {
		this.rootKeys = rootKeys;
		this.map = new Map();
		this.mux = null;
		this.setupMUX();
	}

	setupMUX() {
		let importers = [];
		this.rootKeys.forEach((rootkey, i, l) => {
			const importer = new Importer(rootkey);
			importers.push(importer);
			this.map.set(rootkey, importer);
		});

		this.mux = new MUX(...importers);
	}

	get modules() { this.mux.modules; }
	set moduleFetchHandler(_) { this.mux.moduleFetchHandler = _; }
	set completionHandler(_) { this.mux.completionHandler = _; }

	async importRoot(rootKey, importData, callback) {
		if (!importData.modules) return;
		let importer = this.map.get(rootKey);

		if (!(importer instanceof Importer)) {
			importer = new Importer(rootKey);
			this.mux.add(importer);
		}

		importer.import(importData.modules, importData.callback);
	}

	async import(importData, callback) {
		for (const rootKey in importData) this.importRoot(rootKey, importData[rootKey]);
		if (callback instanceof Function) this.completionHandler = callback;
	}
};
