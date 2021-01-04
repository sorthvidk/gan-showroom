const fileMA = require('./mediaAssets.json')
const fileCI = require('./collectionItems.json')

const path = require('path')
const fs = require('fs')

const uniqueId = () =>
	'-' +
	Math.random()
		.toString(36)
		.substr(2, 9)

const date = new Date()
const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

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

const outputFolder = 'test'

const defaultMediaAsset = ({ name, styleId, groupId, filters }) => ({
	assetId: uniqueId(),
	cloudinaryUrl: '',
	onTop: true,
	visible: true,
	aspect: 'portrait',
	type: 'image',
	styleId,
	name,
	groupId,
	filters
})

fileCI.forEach(item => {
	const styleFileName = `../assets/${outputFolder}/collectionItems/${dateString}-${item['groupId']}-${item['styleId']}.json`.replace(
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
	Array(item.numberOfAssets || 1)
		.fill(0)
		.forEach((_, idx) => {
			const mediaAssetFileName = `../assets/${outputFolder}/mediaAssets/${dateString}-${styleId.replace(
				'/',
				'_'
			)}-${idx + 1}.json`.replace(/ /g, '_')

			fs.writeFile(
				mediaAssetFileName,
				JSON.stringify(
					defaultMediaAsset({
						name,
						styleId,
						groupId,
						filters: defaultFilters[filters[0]] || 'default'
					})
				),
				err => {
					if (err) throw err
					console.log(`Media Asset ${mediaAssetFileName} done`)
				}
			)
		})
})
