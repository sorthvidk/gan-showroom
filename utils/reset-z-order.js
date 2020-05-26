export default function(windowList) {
	let windowsLength = windowList.length
	let sortedWindowList = windowList.sort((a, b) =>
		a.positionZ > b.positionZ ? 1 : -1
	)
	for (var i = 0; i < windowsLength; i++) {
		// console.log('z',sortedWindowList[i].positionZ)
	}
	
	for (var j = 0; j < windowsLength; j++) {
		sortedWindowList[j].positionZ = j;
		// console.log(sortedWindowList[j].positionZ)
	}
	return sortedWindowList;
}