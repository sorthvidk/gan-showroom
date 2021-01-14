const path = require('path')
const config = require('./config.js')
const helpers = require('./helpers.js')

const files = helpers.getEveryJSONInDirectory(config.COLLECTION_ITEMS_PATH)

describe('Collection Items', () => {
	test('Each file should be a .json', () => {
		files(({ filePath }) => expect(path.extname(filePath)).toBe('.json'))
	})

	test('groupId should not include spaces', () => {
		files(({ data }) => expect(data.groupId).not.toMatch(/ /))
	})

	test('styleId should be uniqe', () => {
		const styleIds = []
		files(({ data }) => {
			expect(styleIds.includes(data.styleId)).toBe(false)
			styleIds.push(data.styleId)
		})
	})
})
