const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
	let moduleName = key.replace(/(\.\/|\.js)/g, '')
	let childModules = {
		...files(key).default
	}
	for (let childModuleName in childModules) {
		modules[moduleName.toUpperCase() + '|' + childModuleName.toUpperCase()] = childModules[childModuleName]
	}
})

export default modules
