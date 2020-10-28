// var snack = {
// 	id: '0001',
// 	name: 'Cake',
// 	batters: {
// 		batter: [
// 			{ id: '1001', type: 'Regular' },
// 			{ id: '1002', type: 'Chocolate' },
// 			{ id: '1003', type: 'Blueberry' }
// 		]
// 	}
// }
// getNested(snack, 'batters.batter').length              // --> 3
// getNested(snack, 'batters.batter.2.id')                // --> "1003"
// getNested(snack, 'batters.batter[1].id')               // --> "1002"
// getNested(snack, 'batters.batter[99].id') || 0         // --> 0
// getNested(snack, 'batters.batter.nutrition') || 'none' // --> 'none'
// getNested(snack, 'batters/batter/0/id', '/')           // --> "1001"

export function getNested(theObject, path, separator) {
	try {
		separator = separator || '.'

		return path
			.replace('[', separator)
			.replace(']', '')
			.split(separator)
			.reduce(function(obj, property) {
				return obj[property]
			}, theObject)
	} catch (err) {
		return undefined
	}
}
