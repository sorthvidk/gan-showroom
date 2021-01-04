export const getRandomIntHash = n => {
	return Math.sin((n + 1) * 1337.69) * Math.sin((n + 69) * 69.1337) * 0.5 + 0.5
}
