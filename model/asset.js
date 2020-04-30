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
	mediaId: { //ref to cloudinary image or video
		type: String,
		default: null,
		required: false
	},
	imageAspect: {
		type: String, //landscape, portrait or square
		default: null,
		required: false
	},
	textContent: { //for private letter
		type: String,
		default: null,
		required: false
	}
};