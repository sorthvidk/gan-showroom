import { 
	FILTER_COLLECTION, 
	SET_CURRENT_FILTER, 
	PROGRESS_UPDATE
} from '~/model/constants'

export const state = () => ({

	completedPct: 0,

	currentStyles: [],
	
	filtersParsed: false,

	filters: {
		c1: {
			filterId:'c1',
			name:'Tops',
			styleIds: []
		},
		c2: {
			filterId:'c2',
			name:'Bottoms',
			styleIds: []
		}
	},

	assetsConnected: false,


	list: [
		{
			styleId: 'F8907234',
			filters: ['c1'],
			name: 'Shirt',
			program: '1972',
			programName: 'Stripe Cotton',
			material: '100% organic cotton',
			drop: 'November',
			colorNames: 'Brunnera Blue, Yellow, Brown',
			colorId: '699',
			wholesalePriceDKK: 800,
			wholesalePriceEUR: 110,
			wholesalePriceUSD: 140,
			suggestedRetailPriceDKK: 1000,
			suggestedRetailPriceEUR: 140,
			suggestedRetailPriceUSD: 170,
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt eos, labore autem nostrum.',
			assets: [],			
			completed: false
		},
		{
			styleId: 'F5987334',
			filters: ['c1', 'c2'],
			name: 'Dress',
			program: '1972',
			programName: 'Stripe Cotton',
			material: '100% organic cotton',
			drop: 'November',
			colorNames: 'Brunnera Blue, Yellow, Brown',
			colorId: '699',
			wholesalePriceDKK: 800,
			wholesalePriceEUR: 110,
			wholesalePriceUSD: 140,
			suggestedRetailPriceDKK: 1000,
			suggestedRetailPriceEUR: 140,
			suggestedRetailPriceUSD: 170,
			description: 'Odio repellendus, fugit fuga. Consectetur natus, dolorem amet aperiam.',
			assets: [],
			completed: false
		},
		{
			styleId: 'F1121095',
			filters: ['c2'],
			name: 'Pants',
			program: '1972',
			programName: 'Stripe Cotton',
			material: '100% organic cotton',
			drop: 'November',
			colorNames: 'Brunnera Blue, Yellow, Brown',
			colorId: '699',
			wholesalePriceDKK: 800,
			wholesalePriceEUR: 110,
			wholesalePriceUSD: 140,
			suggestedRetailPriceDKK: 1000,
			suggestedRetailPriceEUR: 140,
			suggestedRetailPriceUSD: 170,
			description: 'Qui voluptatibus consequuntur tempore nam accusantium quam assumenda.',
			assets: [],
			completed: false
		}
	]
});

export const mutations = {
	[FILTER_COLLECTION.mutation] (state) {
		
		// run through data, make reference lists for each filter
		
		if ( state.filtersParsed ) return false;


		let cl = state.list.length;
		for (var i = 0; i < cl; i++) {
			let style = state.list[i];
			let fl = style.filters.length;

			for (var j = 0; j < fl; j++) {
				let filter = style.filters[j];
				state.filters[filter].styleIds.push(style.styleId);
			}
		}

		//set current subset of total collection to total collection
		state.currentStyles = state.list;

		state.filtersParsed = true;
	},
	[PROGRESS_UPDATE.mutation] (state, styleId) {
		state.list.filter(e => e.styleId === styleId)[0].completed = true;
	},
	[SET_CURRENT_FILTER.mutation] (state, filterId) {
		// set current collection to filtered by params
		state.filtered = state.list.filter(e => e.styleId === styleId)
	},
};

export const actions = {

	[FILTER_COLLECTION.action] ({ commit }) {
		commit(FILTER_COLLECTION.mutation)
	},	
	[SET_CURRENT_FILTER.action] ({ commit }, filterId) {
		// ex 'c2'
		commit(SET_CURRENT_FILTER.mutation, filterId)
	},
	[PROGRESS_UPDATE.action] ({ commit }, styleId) {
		// ex 'F1121095'
		commit(PROGRESS_UPDATE.mutation, styleId)
	},	

};