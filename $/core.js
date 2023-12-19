export const core = { }
const keys = ['router', 'importer']

export const requestService = async (key, callback = null) => {
	try {
		const module = await import('./'+ key +'.js')
		if (core[key] instanceof Function) core[key](module)
		if (callback instanceof Function) callback(module)
		if (module.bind instanceof Function) module.bind(core)
		core[key] = module
	} catch { console.error('[-(CORE)-]', key) }
}

(async (_) => {
	keys.forEach(key => { requestService(key) })
})(core)
