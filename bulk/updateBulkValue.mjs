import fs from 'fs'
import glob from 'glob'

const data = fs.readFileSync('./files/21.4-bulk-upload-NEW-GBP-PRICES.json')
const json = JSON.parse(data)

const assetsFolder = '../assets/content/collectionItems'

json
	.map(f => ({ ...f, retailPriceGBP: parseInt(f.retailPriceGBP) }))
	.forEach(updatedValues => {
		glob(`${assetsFolder}/*${updatedValues.styleId}*.json`, (er, [file]) => {
			if (!file) return

			const oldJson = JSON.parse(fs.readFileSync(file, 'utf8'))

			const newContent = {
				...oldJson,
				...updatedValues
			}

			// console.log(newContent)

			fs.writeFile(file, JSON.stringify(newContent), err => {
				if (err) return console.log(err)
			})
		})
	})
