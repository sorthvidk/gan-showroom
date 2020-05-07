import { 
	FILTER_COLLECTION, 
	SET_CURRENT_FILTER, 
	PROGRESS_UPDATE,
	ADD_TO_WISHLIST,
	REMOVE_FROM_WISHLIST,
	ALL_ASSETS_VISIBLE,
	SHOW_NEXT_STYLE,
	SHOW_PREVIOUS_STYLE,
	OPEN_STYLE_CONTENT,
	CLOSE_WINDOW_GROUP,
} from '~/model/constants'

export const state = () => ({

	completedPct: 0,

	currentStyles: [],
	
	filtersParsed: false,
	
	activeFilter: {
		filterId: null,
		name: '',
		styleIds: []
	},
	
	wishList: [],

	filters: [
		{
			filterId:'c1',
			name:'Tops',
			styleIds: []
		},
		{
			filterId:'c2',
			name:'Animal print',
			styleIds: []
		}
	],

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
			completed: false,
			onWishList: false,
			index: null
		},
		{
			styleId: 'F5987334',
			filters: ['c1'],
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
			completed: false,
			onWishList: false,
			index: null
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
			completed: false,
			onWishList: false,
			index: null
		}
	]
});

export const mutations = {
	[ALL_ASSETS_VISIBLE.mutation] (state, styleItem) {
		
		let listStyle = state.list.filter(e => e.styleId === styleItem.styleId)[0]
		let sial = listStyle.assets.length;

		for (var i = 0; i < sial; i++) {
			let asset = listStyle.assets[i];
			asset.visible = true;
		}
	},
	[ADD_TO_WISHLIST.mutation] (state, styleItem) {
		if ( styleItem.onWishList ) return false;
		else {
			let listStyle = state.list.filter(e => e.styleId === styleItem.styleId)[0]
			listStyle.onWishList = true;
			state.wishList.push(styleItem);
		}
	},
	[REMOVE_FROM_WISHLIST.mutation] (state, styleItem) {
		if ( !styleItem.onWishList ) return false;
		else {
			let listStyle = state.list.filter(e => e.styleId === styleItem.styleId)[0]
			listStyle.onWishList = false;
			state.wishList = state.wishList.filter(e => e.styleId !== styleItem.styleId);
		}
	},
	[SHOW_PREVIOUS_STYLE.mutation] (state, styleId) {
		let listStyle = state.currentStyles.filter(e => e.styleId === styleId)[0]
		console.log(styleId,listStyle,listStyle.index)

		
	},
	[SHOW_NEXT_STYLE.mutation] (state, styleId) {
		let listStyle = state.currentStyles.filter(e => e.styleId === styleId)[0]
		console.log(styleId,listStyle,listStyle.index)
		
	},
	[FILTER_COLLECTION.mutation] (state) {
		
		// run through data, make reference lists for each filter
		
		if ( state.filtersParsed ) return false;


		let cl = state.list.length;
		for (var i = 0; i < cl; i++) {
			let style = state.list[i];
			let fl = style.filters.length;

			for (var j = 0; j < fl; j++) {
				let styleFilter = style.filters[j];
				let stateFilter = state.filters.filter(e => e.filterId === styleFilter)[0]
				stateFilter.styleIds.push(style.styleId);
			}
		}

		//set current subset of total collection to total collection
		state.currentStyles = state.list;
		state.activeFilter = {
			filterId: null,
			name: '',
			styleIds: []
		};
		state.filtersParsed = true;
	},
	[SET_CURRENT_FILTER.mutation] (state, filterId) {
		if ( !filterId || filterId == '' ) {
			
			let cl = state.list.length;

			for (var j = 0; j < cl; j++) {
				state.list[j].index = j;
			}

			state.currentStyles = state.list;
			state.activeFilter = {
				filterId: null,
				name: '',
				styleIds: []
			};
		}
		else {
			// set current collection to filtered by params
			state.activeFilter = state.filters.filter(e => e.filterId === filterId)[0]

			let styleIds = state.activeFilter.styleIds;
			let sil = styleIds.length;
			let newCurrentStyles = []; 

			for (var i = 0; i < sil; i++) {
				let styleId = styleIds[i];
				let addedStyle = state.list.filter(e => e.styleId === styleId)[0];
				addedStyle.index = i;
				newCurrentStyles.push( addedStyle );
			}
			state.currentStyles = newCurrentStyles;
		}
	},
	[PROGRESS_UPDATE.mutation] (state, styleId) {
		state.list.filter(e => e.styleId === styleId)[0].completed = true;

		let cc = 0;
		let cl = state.list.length;
		for (var i = 0; i < cl; i++) {
			let style = state.list[i];
			if ( style.completed ) cc++;
		}
		state.completedPct = Math.round((cc/cl)*100);
	},
};

export const actions = {

	[ALL_ASSETS_VISIBLE.action] ({ commit }, style) {
		commit(ALL_ASSETS_VISIBLE.mutation, style)
	},
	[ADD_TO_WISHLIST.action] ({ commit }, style) {
		commit(ADD_TO_WISHLIST.mutation, style)
	},	
	[REMOVE_FROM_WISHLIST.action] ({ commit }, style) {
		commit(REMOVE_FROM_WISHLIST.mutation, style)
	},	
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
	[SHOW_PREVIOUS_STYLE.action] ({ commit, dispatch, state }, styleId) {
		dispatch(CLOSE_WINDOW_GROUP.action, {}, {root:true})
		
		let listStyle = state.currentStyles.filter(e => e.styleId === styleId)[0]

		if ( !listStyle ) return false;

		let styleCount = state.currentStyles.length,
			index = listStyle.index,
			nextIndex = index === 0 ? styleCount-1 : index-1,
			prevStyle = state.currentStyles.filter(e => e.index === nextIndex)[0];

		if ( prevStyle ) {
			dispatch(OPEN_STYLE_CONTENT.action, prevStyle.styleId, {root:true} );
		}

	},
	[SHOW_NEXT_STYLE.action] ({ commit, dispatch, state }, styleId) {
		dispatch(CLOSE_WINDOW_GROUP.action, {}, {root:true})
		
		let listStyle = state.currentStyles.filter(e => e.styleId === styleId)[0]

		if ( !listStyle ) return false;

		let styleCount = state.currentStyles.length,
			index = listStyle.index,
			nextIndex = index === styleCount-1 ? 0 : index+1,
			nextStyle = state.currentStyles.filter(e => e.index === nextIndex)[0];

		if ( nextStyle ) {
			dispatch(OPEN_STYLE_CONTENT.action, nextStyle.styleId, {root:true} );
		}
	},	

};