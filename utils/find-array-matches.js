export default function(valArray, searchArray, prop) {
	let al = valArray.length
	let newArray = []

	for (var i = 0; i < al; i++) {
		let val = valArray[i]
		let foundMatch = searchArray.filter(e => e[prop] === val)[0]
		if (foundMatch) newArray.push(foundMatch)
	}
	return newArray
}
