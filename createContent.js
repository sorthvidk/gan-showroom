const fs = require('fs')
const path = require('path')

const baseURL = __dirname + '/assets/content-mockup/'
const collection = baseURL + 'collectionItems'
const filters = baseURL + 'collectionFilters'

fs.readdir(collection, (err, filePaths) => {
	if (err) throw err

	filePaths.forEach(file => {
		if (err) throw err

		const filePath = collection + '/'
		const filePathName = filePath + file
		const fileName = path.basename(filePathName, path.extname(filePath))

		fs.readFile(filePathName, (err, fileContent) => {
			if (err) throw err

			let json

			try {
				var o = JSON.parse(fileContent)

				if (o && typeof o === 'object') {
					json = o
				}
			} catch (e) {
				return
			}

			const updated = Object.assign(json, { collectionId: 'one' })
			const newJSON = JSON.stringify(updated)
			fs.writeFile(
				filePath + 'newer-' + fileName + path.extname(filePath),
				newJSON,
				err => {
					if (err) throw err
					console.log('written')
				}
			)
		})
	})
})
