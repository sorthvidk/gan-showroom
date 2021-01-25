const path = require('path')
const helpers = require('./helpers.js')

// globals
let mediaAssets
let collectionItems
let configFileAsJSON
let mediaAssetsFields

describe('Media Assets', () => {
	beforeAll(async () => {
		mediaAssets = await helpers.getAssets('mediaAssets')
		collectionItems = await helpers.getAssets('collectionItems')
		configFileAsJSON = await helpers.configFile
		mediaAssetsFields = configFileAsJSON.collections.find(
			c => c.name === 'mediaAssets'
		).fields
	})

	test('Each file should be a .json', () => {
		mediaAssets.forEach(({ filePath }) =>
			expect(path.extname(filePath), filePath).toBe('.json')
		)
	})

	test('The amount of files should be correct', () => {
		const styleAssets = collectionItems.map(({ data }) => data.assets).flat()
		expect(mediaAssets).toHaveLength(styleAssets.length)
	})

	test('Media assets file should have correct keys', () => {
		const target = mediaAssetsFields.map(({ name }) => name).sort()
		mediaAssets.forEach(({ data }) => {
			const current = Object.keys(data).sort()
			expect(current, data.styleId).toEqual(target)
		})
	})
})
