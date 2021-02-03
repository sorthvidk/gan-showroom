const fs = require('fs')
const path = require('path')
// const fileMA = require('./mediaAssets.json')
const fileCI = require('./files/21.3_GANNISPACE_UPLOAD-upload02.json')
const testFile = require('./files/bulkupload_test.json')

const uniqueId = () =>
	Math.random()
		.toString(36)
		.substr(2, 9)

const date = new Date()
const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

const parseFalse = x => x === 'FALSK' || x === false

function clean(obj) {
	for (var propName in obj) {
		if (obj[propName] === null || obj[propName] === undefined) {
			delete obj[propName]
		}
	}
	return obj
}

const isVideo = fileName =>
	[
		'.WEBM',
		'.MPG',
		'.MP2',
		'.MPEG',
		'.MPE',
		'.MPV',
		'.OGG',
		'.MP4',
		'.M4P',
		'.M4V',
		'.AVI',
		'.WMV',
		'.MOV',
		'.QT',
		'.FLV',
		'.SWF',
		'.AVCHD'
	].find(ext => fileName.toUpperCase().includes(ext))

// copypasted from netlify cms
const defaultFilters = {
	misc5: 'GANNI Software',
	rtw1: 'Dresses',
	rtw2: 'Denim',
	rtw3: 'Coats / Jackets',
	rtw4: 'Jersey',
	rtw5: 'Knitwear',
	rtw6: 'Skirts',
	rtw7: 'Suiting',
	rtw8: 'Tops',
	rtw9: 'Trousers',
	rtw10: 'T-shirts',
	rtw11: 'Shorts',
	acc1: 'Accessories',
	acc2: 'Bags',
	acc3: 'Shoes',
	acc4: 'Swimwear',
	acc5: 'Hats',
	acc6: 'Underwear',
	misc1: 'White Cotton Poplin',
	misc2: 'Design Darlings',
	misc3: 'Leather',
	misc4: 'Love for Leopard'
}

const OUT_FOLDER = 'content' // no slashes
const STYLES_FILE = fileCI
const assetFolder = `../assets/${OUT_FOLDER}`

STYLES_FILE.forEach(item => {
	const styleFileName = `${assetFolder}/collectionItems/${dateString}-${item['groupId']}-${item['styleId']}.json`.replace(
		/ /g,
		'_'
	)

	const { name, styleId, groupId, filters } = item

	/**
	 * format the incoming object before parsing it to a json file
	 */
	const itemFormatted = clean({
		...item,
		/**
		 * Any string value representing a boolean, should become a boolean
		 */
		responsible: parseFalse(item.responsible) ? false : true,
		['re-runner']: parseFalse(item['re-runner']) ? false : true,
		/**
		 * rm the cloudinary url's on assets
		 * (this will be filled with mediaAsset-objects on runtime)
		 */
		assets: []
	})

	fs.writeFile(styleFileName, JSON.stringify(itemFormatted), err => {
		if (err) throw err
		console.log(`Collection item ${styleFileName} done`)
	})

	/**
	 * create media asset files
	 */
	item.assets
		.filter(a => a !== '')
		.forEach((asset, idx) => {
			const mediaAssetFileName = `${assetFolder}/mediaAssets/${dateString}-${styleId.replace(
				'/',
				'_'
			)}-${idx + 1}.json`.replace(/ /g, '_')

			fs.writeFile(
				mediaAssetFileName,
				JSON.stringify({
					assetId: uniqueId(),
					cloudinaryUrl: asset,
					onTop: true,
					visible: true,
					aspect: asset.includes('landscape') ? 'landscape' : 'portrait',
					type: isVideo(path.extname(asset)) ? 'video' : 'image',
					styleId,
					name,
					groupId,
					filters: defaultFilters[filters[0]] || 'default'
				}),
				err => {
					if (err) throw err
					console.log(`Media Asset ${mediaAssetFileName} done`)
				}
			)
		})
})
