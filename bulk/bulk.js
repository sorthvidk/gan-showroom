const fileMA = require('./mediaAssets.json')
const fileCI = require('./collectionItems.json')

const path = require('path')
const fs = require('fs')

const date = new Date()
const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
const patchCollection = item => ({ ...item })

fileMA.forEach(item => {
	let fn = `../assets/content/mediaAssets/${dateString}-${item['assetId']}-${item['styleId']}.json`
	fn = fn.replace(/ /g, '_')
	fs.writeFile(fn, JSON.stringify(item), err => {
		if (err) throw err
		console.log(`Media asset ${fn} done`)
	})
})

fileCI.forEach(item => {
	let fn = `../assets/content/collectionItems/${dateString}-${item['groupId']}-${item['styleId']}.json`
	fn = fn.replace(/ /g, '_')
	fs.writeFile(fn, JSON.stringify(item), err => {
		if (err) throw err
		console.log(`Collection item ${fn} done`)
	})
})
