export const loadImage = url => {
	return new Promise(resolve => {
		const img = new Image()
		img.onload = () => resolve({ img, src: img.src })
		img.src = url
	})
}
