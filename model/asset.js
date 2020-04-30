export default const AssetModel {
	assetId: { //unique identifier
		type: String,
		default: null,
		required: true
	},
	name: {
		type: String,
		default: null,
		required: true
	},
	type: { //either image, video or text
		type: String,
		default: null,
		required: true
	},
	imageUrlDefault: { //viewed when opening style
		type: String,
		default: null,
		required: false
	},
	imageUrlMaximized: { //viewed when maximized
		type: String,
		default: null,
		required: false
	},
	// imageUrlCloseup: { //viewed when closeupping on maximized
	// 	type: String,
	// 	default: null,
	// 	required: false
	// },
	videoUrlMp4: { //mp4 video
		type: String,
		default: null,
		required: false
	},
	videoUrlWebm: { //webm video
		type: String,
		default: null,
		required: false
	},
	textContent: { //for private letter
		type: String,
		default: null,
		required: false
	}
};