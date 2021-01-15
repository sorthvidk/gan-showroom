const glob = require('glob')
const fs = require('fs')

const getPathToEveryJSONInDirectory = folder => cb =>
	glob(`${folder}/*.json`, (_, paths) => paths.forEach(path => cb(path)))

/**
 * returns a callback that will be invoked on every JSON in a directory
 * callback will have ({ filePath, data }) as arguments
 *
 * this will log every file's abs path:
 *
 * const files = getEveryJSONInDirectory(./src)
 * files(({ filePath }) => console.log(filePath))
 */
const getEveryJSONInDirectory = folder => cb =>
	getPathToEveryJSONInDirectory(folder)(filePath =>
		fs.readFile(filePath, 'utf8', (_, data) =>
			cb({ filePath, data: JSON.parse(data) })
		)
	)

module.exports = {
	getEveryJSONInDirectory
}
