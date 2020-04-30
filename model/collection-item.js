export default const CollectionItemModel {
	styleId: { //unique identifier
		type: String,
		default: null,
		required: true
	},
	name: { //"file name" human readable title
		type: String,
		default: null,
		required: true
	},
	program: { //series lvl 1
		type: String,
		default: null,
		required: true
	},
	programName: { //series lvl 2
		type: String,
		default: null,
		required: true
	},
	material: { //textile
		type: String,
		default: null,
		required: true
	},
	drop: { //ready for order time
		type: String,
		default: null,
		required: true
	},
	colorNames: { // human readable
		type: String,
		default: null,
		required: true
	},
	colorId: { // human readable number
		type: String,
		default: null,
		required: true
	},
	wholesalePriceDKK: { //price in DKK
		type: String,
		default: null,
		required: true
	},
	wholesalePriceEUR: { //price in EUR
		type: String,
		default: null,
		required: true
	},
	wholesalePriceUSD: { //price in USD
		type: String,
		default: null,
		required: true
	},
	suggestedRetailPriceDKK: { //price in DKK
		type: String,
		default: null,
		required: true
	},
	suggestedRetailPriceEUR: { //price in EUR
		type: String,
		default: null,
		required: true
	},
	suggestedRetailPriceUSD: { //price in USD
		type: String,
		default: null,
		required: true
	},
	description: { //long description
		type: String,
		default: null,
		required: true
	},
	assetIds: { //list of asset references
		type: Array,
		default: null,
		required: true
	}
};