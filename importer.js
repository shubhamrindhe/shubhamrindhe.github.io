
export default class Importer {

	constructor(root) {
		this.root = root;
		this.modulePaths = null;
		this.modules = {};

		this.importPathData();
		this.finalCallback = null;

		this.modulesToImport = null;
		this.importedModules = null;
		this.importHandlers = null;
		this.errorHandler = null;
	}

	async importPathData() {
		import(this.exportPath).then(module => {
			this.modulePaths = module.default;

			if (this.modulesToImport != null) {
				this.import(this.moduleKeyHandlersPair, this.finalCallback);
			}
		}).catch(error => {
			console.error(new Error(`export.js file not found in ${this.root}`), error);
		});
	}

	get exportPath() {
		return `${this.basePath}/export.js`;
	}

	get basePath() {
		/*
		if (location.href.search(this.root) == -1) {
			let path = './';
			for (var i = 0; i < location.href.split('/').length - 4; ++i) { path += '../'; }
			return `./${this.root}`//`${path}${this.root}`;
		} else {
			let path = './';
			let relPath = location.href.split(this.root).pop();
			for (var i = 0; i < relPath.split('/').length - 2; ++i) { path += '../'; }
			console.log("in", path, relPath);
			return `./${this.root}`//path;
		}
		*/
		return `./${this.root}`;
	}

	importModuleWithKey(key) {
		const relativePath = this.modulePaths[key];
		import(`${this.basePath}${relativePath}`).then(module => {
			this.handleImportedModule(module, key)
		}).catch(error => {
			let err = new Error(`file not found in ${this.root}${relativePath}`)
			console.error(error);
			if (this.errorHandler instanceof Function) {
				this.errorHandler(key, error);
			}
		});
	}

	handleImportedModule(module, key) {
		this.modules[key] = module;
		this.importedModules.add(key);

		if (this.importHandlers) {
			if (this.importHandlers[key] instanceof Function) {
				this.importHandlers[key](module);
			}
		}

		if (this.modulesToImport.size == this.importedModules.size) {
			this.finalCallback(this.modules);
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

		if (finalCallback instanceof Function) {
			this.finalCallback = finalCallback;
		}
	}

	async import(moduleData, finalCallback = null) {
		this.beginImport(moduleData, finalCallback);

		if (this.modulePaths == null) return;

		this.modulesToImport.forEach(key => {
			this.importModuleWithKey(key);
		});
	}
}
