export const isVideo = fileName =>
	[
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
	].find(ext => fileName.toUpperCase().includes(ext))

export const isNotVideo = fileName => !isVideo(fileName)
