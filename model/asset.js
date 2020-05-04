export default {
	assetId: { //unique identifier, ref to cloudinary image or video
		type: String,
		default: null,
		required: true
	},
	styleId: { //ref to associated style
		type: String,
		default: null,
		required: false
	},
	type: { //either image, video or text
		type: String,
		default: null,
		required: true
	},
	name: {
		type: String,
		default: null,
		required: true
	},
	imageAspect: {
		type: String, //landscape, portrait or square
		default: null,
		required: false
	},
	onTop: {
		type: Boolean, //focused image for collection, topmost window
		default: null,
		required: false
	},
	visible: {
		type: Boolean, //false for optional variant images
		default: null,
		required: false
	}
};