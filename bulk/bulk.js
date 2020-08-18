const fileMA = require('./mediaAssets.json')
const fileCI = require('./collectionItems.json')

const path = require('path')
const fs = require('fs')

const date = new Date()
const patchCollection = item => {
	return {
		...item
	}
}

fileMA.forEach(item => {
	// console.log(
	// 	`${date.getFullYear()}-${date.getDate()}-${item['STYLE #']}}`,
	// 	item
	// )
	fs.writeFile(
		`../assets/content/mediaAssets/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${item['assetId'].replace(' ','_')}-${item['styleId']}.json`,
		JSON.stringify(item),
		err => {
			if (err) throw err
			console.log('Media assets done')
		}
	)
})


fileCI.forEach(item => {
	// console.log(
	// 	`${date.getFullYear()}-${date.getDate()}-${item['STYLE #']}}`,
	// 	item
	// )
	fs.writeFile(
		`../assets/content/collectionItems/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${item['collectionId']}-${item['styleId']}.json`,
		JSON.stringify(item),
		err => {
			if (err) throw err
			console.log('Collection items done')
		}
	)
})
