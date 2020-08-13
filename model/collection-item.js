export default {
	styleId: {
		//unique identifier
		type: String,
		default: null
	},
	name: {
		//"file name" human readable title
		type: String,
		default: null
	},
	program: {
		//series lvl 1
		default: null
	},
	programName: {
		//series lvl 2
		type: String,
		default: null
	},
	material: {
		//textile
		type: String,
		default: null
	},
	drop: {
		//ready for order time
		type: String,
		default: null
	},
	colorNames: {
		// human readable
		type: String,
		default: null
	},
	colorId: {
		// human readable number
		default: null
	},
	wholesalePriceDKK: {
		//price in DKK
		type: Number,
		default: 0
	},
	wholesalePriceEUR: {
		//price in EUR
		type: Number,
		default: 0
	},
	wholesalePriceUSD: {
		//price in USD
		type: Number,
		default: 0
	},
	retailPriceDKK: {
		//price in DKK
		type: Number,
		default: 0
	},
	retailPriceEUR: {
		//price in EUR
		type: Number,
		default: 0
	},
	retailPriceUSD: {
		//price in USD
		type: Number,
		default: 0
	},
	filters: {
		type: Array,
		default: null
	},
	assets: {
		type: Array,
		default: null
	},
	index: {
		type: Number,
		default: 0
	},
	responsible: {
		type: Boolean,
		default: false
	},
	collectionId: {
		// which collection the style belongs to
		type: String,
		default: ''
	}
}
