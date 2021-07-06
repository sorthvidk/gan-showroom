// https://poopcode.com/shuffle-randomize-an-array-in-javascript-using-knuth-fisher-yates-shuffle-algorithm/
// Shuffle an array in JavaScript
export function shuffle(array) {
	const copiedArray = [...array]
	var m = array.length,
		temp,
		i

	// Check if there's still elements remaining
	while (m) {
		// Pick remaining element
		i = Math.floor(Math.random() * m--)

		// Swap it with the current element
		temp = copiedArray[m]
		copiedArray[m] = copiedArray[i]
		copiedArray[i] = temp
	}

	return copiedArray
}
