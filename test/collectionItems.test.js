const path = require('path')
const helpers = require('./helpers.js')

// globals
let collectionItems
let collectionGroups
let configFileAsJSON
let collectionItemsFieldsModel

describe('Collection Items', () => {
	beforeAll(async () => {
		/**
		 * Array with all files in /collectionItems as json
		 * { filePath: 'path/to/file.json', data: {} }
		 */
		collectionItems = await helpers.getAssets('collectionItems')
		const groupFiles = await helpers.getAssets('collectionGroups')

		collectionGroups = groupFiles.map(({ data }) => data.groupId)

		// store config file as json
		configFileAsJSON = await helpers.configFile

		/**
		 * create an object that acts as a key-value model to check values against
		 * f.e { styleId: 'string', retailPriceDKK: 'number' }
		 */
		collectionItemsFieldsModel = configFileAsJSON.collections
			.find(c => c.name === 'collectionItems')
			.fields.reduce(makeModel, {})
	})

	test('Each file should be a .json', () => {
		collectionItems.forEach(({ filePath }) =>
			expect(path.extname(filePath), filePath).toBe('.json')
		)
	})

	test('Collection Item keys should be named correct', () => {
		collectionItems.forEach(({ data }) => {
			for (let key in data) {
				expect(collectionItemsFieldsModel[key], data.styleId).toBeDefined()
			}
		})
	})

	test('Collection Item values should have correct type', () => {
		collectionItems.forEach(({ data }) => {
			for (let key in data) {
				expect(
					typeof data[key],
					`${data.styleId}: incorrect type of '${key}'`
				).toBe(collectionItemsFieldsModel[key])
			}
		})
	})

	test('groupId should not include spaces', () => {
		collectionItems.forEach(({ data }) =>
			expect(data.groupId, data.styleId).not.toMatch(/ /)
		)
	})

	test('styles groupId should exist', () => {
		collectionItems.forEach(({ data }) =>
			expect(collectionGroups, data.styleId).toContain(data.groupId)
		)
	})

	test('styleId should be uniqe', () => {
		const styleIds = []
		collectionItems.forEach(({ data }) => {
			expect(styleIds, data.styleId).not.toContain(data.styleId)
			styleIds.push(data.styleId)
		})
	})

	// test('false is true', () => {
	// 	expect(false).toBe(true)
	// })
})

/**s
 * Local helpers
 */
function getType(field) {
	// NOTE: fails when value is int[]
	switch (true) {
		// case field.name === 'index':
		// 	return 'number'
		case field.multiple:
			return 'object'
		case field.name === 'assets':
			return 'object'
		case field.widget === 'number':
			return 'number'
		case field.widget === 'boolean':
			return 'boolean'
		case field.widget === 'relation':
			return 'string'
		case field.widget === 'string':
		case field.widget === 'text':
			return 'string'

		default:
			return 'undefined'
	}
}

function makeModel(acc, field) {
	return { ...acc, [field.name]: getType(field) }
}