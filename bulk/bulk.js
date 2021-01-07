const fs = require('fs')
const path = require('path')
// const fileMA = require('./mediaAssets.json')
// const fileCI = require('./collectionItems.json')
const testFile = require('./files/mock.json')

const uniqueId = () =>
	Math.random()
		.toString(36)
		.substr(2, 9)

const date = new Date()
const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

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

const isVideo = ext =>
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
	].includes(ext.toUpperCase())

// no slashes
const OUT_FOLDER = 'test'
// json with array
const STYLES_FILE = testFile

const assetFolder = `../assets/${OUT_FOLDER}`

STYLES_FILE.forEach(item => {
	const styleFileName = `${assetFolder}/collectionItems/${dateString}-${item['groupId']}-${item['styleId']}.json`.replace(
		/ /g,
		'_'
	)

	const { name, styleId, groupId, filters } = item

	fs.writeFile(styleFileName, JSON.stringify(item), err => {
		if (err) throw err
		console.log(`Collection item ${styleFileName} done`)
	})

	/**
	 * create media asset files
	 */
	item.assets.forEach((asset, idx) => {
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
				aspect: 'portrait',
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
