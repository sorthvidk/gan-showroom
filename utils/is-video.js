const videoExtentions = [
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
]

export const isVideo = fileName => {
	let data = null

	if (Array.isArray(fileName)) {
		data = fileName[0]
	} else data = fileName

	if (typeof data.toUpperCase !== 'function') {
		console.log(data)
		return false
	}

	if (!data) return false

	return videoExtentions.find(ext => data.toUpperCase().includes(ext))
		? true
		: false
}

export const isNotVideo = fileName => !isVideo(fileName)
