const file = require('./assets.json')
const path = require('path')
const fs = require('fs')

const date = new Date()
file.forEach(item => {
	// console.log(
	// 	`${date.getFullYear()}-${date.getDate()}-${item['STYLE #']}}`,
	// 	item
	// )
	fs.writeFile(
		`./export/${date.getFullYear()}-${date.getDate()}-${item['STYLE #']}.json`,
		JSON.stringify(item),
		err => {
			if (err) throw err
			console.log('The file has been saved!')
		}
	)
})
