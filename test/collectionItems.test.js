const path = require('path')
const config = require('./config.js')
const helpers = require('./helpers.js')

const eachCollectionItem = helpers.getEveryJSONInDirectory(
	config.COLLECTION_ITEMS_PATH
)

describe('Collection Items', () => {
	test('Each file should be a .json', () => {
		eachCollectionItem(({ filePath }) =>
			expect(path.extname(filePath)).toBe('.json')
		)
	})

	test('groupId should not include spaces', () => {
		eachCollectionItem(({ data }) => expect(data.groupId).not.toMatch(/ /))
	})

	test('styleId should be uniqe', () => {
		const styleIds = []
		eachCollectionItem(({ data }) => {
			expect(styleIds).not.toContain(data.styleId)
			styleIds.push(data.styleId)
		})
	})
})
