/*
 * ! use with caution !
 *
 * this file will modify files,
 * be sure to apply correct filePath and fileName
 *
 */

const fs = require('fs')
const path = require('path')

// files should be read/written to the mockup folder
const USE_MOCKUP_FOLDER = true

// absolute path to the content folder
const baseURL =
	__dirname + `/assets/content${USE_MOCKUP_FOLDER ? '-mockup' : ''}/`

// absolute path to the collectionItems folder
const collection = baseURL + 'collectionItems'

// read all the files in the given collectionItems folder
fs.readdir(collection, (err, filePaths) => {
	if (err) throw err

	// map all the file names
	filePaths.forEach(relFilePath => {
		if (err) throw err

		// absolute path to the collectionItems folder, with trailing slash
		const absFolderPath = collection + '/'

		// absolute path to the current file in the loop
		const absFilePathName = absFolderPath + relFilePath

		// only the file name, without extention
		const fileName = path.basename(absFilePathName, path.extname(absFolderPath))

		// map all the file names
		fs.readFile(absFilePathName, (err, fileContent) => {
			if (err) throw err

			// will be populated with the existing file content
			let existingContent

			/*
			 * what ever we like to add to the existing json object in the file
			 */
			const newContent = { collectionId: 'PS21' }

			// check that the file contains valid JSON
			try {
				var o = JSON.parse(fileContent)

				if (o && typeof o === 'object') {
					json = o
				}
			} catch (e) {
				return
			}

			// merge new content into existing content
			const updatedContent = Object.assign(existingContent, newContent)
			const newJSON = JSON.stringify(updatedContent)

			// create the new, updated, file
			fs.writeFile(
				absFolderPath + fileName + path.extname(absFolderPath),
				newJSON,
				err => {
					if (err) throw err
					console.log('written')
				}
			)
		})
	})
})
