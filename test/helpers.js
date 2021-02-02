const glob = require('glob')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { NETLIFY_CMS_CONFIG_FILE_PATH, ASSET_FOLDER } = require('./config.js')

/**
 * returns an array of strings
 */
const getPathToEveryJSONInDirectory = folder =>
	new Promise((resolve, reject) => {
		glob(`${folder}/*.*`, (err, paths) => {
			if (err) {
				console.warn(err)
				reject(err)
			} else {
				resolve(paths)
			}
		})
	})

const readFile = filePath =>
	new Promise((resolve, reject) =>
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				console.warn(err)
				reject(err)
			} else {
				resolve({ filePath, data: JSON.parse(data) })
			}
		})
	)

/**
 * returns a callback that will be invoked on every JSON in a directory
 * callback will have ({ filePath, data }) as arguments
 *
 * this will log abs path of each json file in /src:
 *
 * const files = getAssets(./src)
 * files(({ filePath }) => console.log(filePath))
 */
const getAssets = folder =>
	new Promise((resolve, reject) =>
		getPathToEveryJSONInDirectory(path.join(ASSET_FOLDER, folder)).then(paths =>
			Promise.all(paths.map(path => readFile(path))).then(files =>
				resolve(files)
			)
		)
	)

/**
 * prints my-file.yml in json format:
 *
 * const json = getYMLFileAsJSON(my-file.yml)
 * json(file => console.log(file))
 */
const getYMLFileAsJSON = filePath => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, ymlFile) => {
			if (err) {
				console.warn(err)
				reject(err)
			} else {
				resolve(yaml.load(ymlFile))
			}
		})
	})
}

const configFile = getYMLFileAsJSON(NETLIFY_CMS_CONFIG_FILE_PATH).then(x => x)

module.exports = {
	getAssets,
	getYMLFileAsJSON,
	configFile
}
