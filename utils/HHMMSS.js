export const HHMMSS = s => {
	const date = new Date(0)
	date.setSeconds(s)
	return date.toISOString().substr(11, 8)
}
