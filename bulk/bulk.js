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
	let fn = `../assets/content/mediaAssets/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${item['assetId']}-${item['styleId']}.json`;
	fn = fn.replace(/ /g,'_')
	fs.writeFile(fn, JSON.stringify(item),
		err => {
			if (err) throw err
			console.log(`Media asset ${fn} done`)
		}
	)
})

fileCI.forEach(item => {
	let fn = `../assets/content/collectionItems/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${item['collectionId']}-${item['styleId']}.json`;
	fn = fn.replace(/ /g,'_')
	fs.writeFile(fn, JSON.stringify(item),
		err => {
			if (err) throw err
			console.log(`Collection item ${fn} done`)
		}
	)
})
