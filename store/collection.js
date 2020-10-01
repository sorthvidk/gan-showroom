import sortArrayMultipleProps from '~/utils/sort-array-multiple'
import findArrayMatches from '~/utils/find-array-matches'

import {
	INDEX_COLLECTION_DATA,
	SET_CURRENT_FILTER,
	SET_GROUP_BY_IDENTIFIER,
	SET_GROUP_BY_INDEX,
	SET_NEXT_GROUP,
	SET_PREVIOUS_GROUP,
	ADD_TO_WISHLIST,
	REMOVE_FROM_WISHLIST,
	ALL_ASSETS_VISIBLE,
	SHOW_NEXT_STYLE,
	SHOW_PREVIOUS_STYLE,
	OPEN_STYLE_CONTENT,
	CLOSE_WINDOW_GROUP
} from '~/model/constants'

export const state = () => ({
	//all indexasion done
	dataIndexComplete: false,

	//loaded from json
	allMediaAssets: [],

	//loaded from json
	allStyles: [],
	//currently active in app
	currentStyles: [],

	//loaded from json
	allGroups: [],
	//currently active in app
	activeGroup: null,
	activeGroupIndex: -1,

	//loaded from json
	allFilters: [],
	//currently available in app
	referencedFilters: [],
	//currently available in active group
	groupFilters: null,

	//currently active filter in assistent
	activeFilter: {
		filterId: null,
		name: '',
		styleIds: []
	},

	//new list
	wishList: []
})

export const mutations = {
	[INDEX_COLLECTION_DATA.mutation](state) {
		if (state.dataIndexComplete) return false
		if (window.GS_LOGS) console.warn('INDEX_COLLECTION_DATA')

		// save lengths
		let al = state.allMediaAssets.length
		let cl = state.allStyles.length
		let gl = state.allGroups.length

		// run through assets, add to styles
		for (var i = 0; i < al; i++) {
			let asset = state.allMediaAssets[i]
			let style = state.allStyles.filter(e => e.styleId === asset.styleId)[0]
			if (style && style.assets) style.assets.push(asset)
			else if (window.GS_LOGS)
				console.warn('NO STYLE FOR ASSET | styleId: "' + asset.styleId + '"')
		}

		//sort style assets to have onTop asset first in assets array
		for (var j = 0; j < cl; j++) {
			let style = state.allStyles[j]
			if (style.assets.length === 0) {
				style.assets.push({
					assetId: getUniqueId(),
					styleId: style.styleId,
					type: 'image',
					name: 'Asset pending',
					aspect: 'portrait',
					onTop: true,
					visible: true,
					defaultImageUrl: '/img/styles/dummy.jpg'
				})
			}
			let sortedAssets = style.assets.sort((a, b) =>
				a.onTop && !b.onTop ? -1 : 1
			)
			style.assets = sortedAssets
			style.onWishList = false
		}

		state.referencedFilters = []

		//parse all styles into groups, make deep copies!
		for (var i = 0; i < cl; i++) {
			let style = state.allStyles[i]

			//add style to group
			let stateGroup = state.allGroups.filter(
				e => e.groupId === style.groupId
			)[0]
			if (window.GS_LOGS)
				console.warn(
					'ADD STYLE ' + style.styleId + ' TO GROUP:',
					stateGroup.groupId
				)
			let clonedStyle = JSON.parse(JSON.stringify(style))
			stateGroup.styles.push(clonedStyle)
		}

		//parse groups
		for (var j = 0; j < gl; j++) {
			let stateGroup = state.allGroups[j]
			let stateGroupId = stateGroup.groupId

			//go through all styles in group
			let gsl = stateGroup.styles.length
			for (var k = 0; k < gsl; k++) {
				let style = stateGroup.styles[k]
				let styleId = style.styleId
				console.warn('PARSE STYLE ' + styleId)
				//extrapolate filters from styles
				let fl = style.filters.length
				for (var l = 0; l < fl; l++) {
					let styleFilterId = style.filters[l]
					let stateFilter = state.allFilters.filter(
						e => e.filterId === styleFilterId
					)[0]
					console.warn('PARSE STYLE FILTER ' + styleFilterId, stateFilter)

					// ==================================================================

					//clone filter, check for existence in stateGroup.filters, then add
					let clonedFilter = JSON.parse(JSON.stringify(stateFilter))
					var foundStateGroupFilter = stateGroup.filters.filter(
						e => e.filterId === styleFilterId
					)[0]
					if (!foundStateGroupFilter) {
						//new filter add to group
						clonedFilter.styleIds = [styleId]
						stateGroup.filters.push(clonedFilter)
						if (window.GS_LOGS)
							console.warn(
								'FILTER ' +
									styleFilterId +
									' NOT IN GROUP "' +
									stateGroupId +
									'" FILTERS, ADD AND PUSH STYLE "' +
									styleId +
									'"'
							)
					} else {
						var foundStyle = foundStateGroupFilter.styleIds.includes(styleId)
						if (!foundStyle) {
							foundStateGroupFilter.styleIds.push(styleId)
							if (window.GS_LOGS)
								console.warn(
									'FILTER ' +
										styleFilterId +
										' ALREADY IN GROUP "' +
										stateGroupId +
										'" FILTERS, STYLE ID NOT YET ADDED, PUSH STYLE ID "' +
										styleId +
										'"'
								)
						} else {
							if (window.GS_LOGS)
								console.warn(
									'FILTER ' +
										styleFilterId +
										' ALREADY IN GROUP "' +
										stateGroupId +
										'" FILTERS, ALREADY IN STYLE IDS'
								)
						}
					}

					// ==================================================================

					//clone again, check for existence in referencedFilters array
					let clonedFilter2 = JSON.parse(JSON.stringify(stateFilter))
					var foundReferencedFilter = state.referencedFilters.filter(
						e => e.filterId === styleFilterId
					)[0]

					if (!foundReferencedFilter) {
						clonedFilter2.styleIds = [styleId]
						state.referencedFilters.push(clonedFilter2)
						if (window.GS_LOGS)
							console.warn(
								'FILTER ' +
									styleFilterId +
									' NOT IN REF FILTERS, ADD AND PUSH STYLE ID "' +
									styleId +
									'"'
							)
					} else {
						var foundStyle = foundReferencedFilter.styleIds.includes(styleId)
						if (!foundStyle) {
							foundReferencedFilter.styleIds.push(styleId)
							if (window.GS_LOGS)
								console.warn(
									'FILTER ' +
										styleFilterId +
										' ALREADY IN REF FILTERS, STYLE ID NOT YET ADDED, PUSH STYLE ID "' +
										styleId +
										'"'
								)
						} else {
							if (window.GS_LOGS)
								console.warn(
									'FILTER ' +
										styleFilterId +
										' ALREADY IN REF FILTERS, ALREADY IN STYLE IDS'
								)
						}
					}
				}
			}
		}

		//sort filters by order
		state.referencedFilters = state.referencedFilters.sort((a, b) =>
			a.order > b.order ? 1 : -1
		)

		//sort groups by order
		state.allGroups = state.allGroups.sort((a, b) =>
			a.order > b.order ? 1 : -1
		)

		//set groupFilters to sreferencedFilters (= ALL)
		state.groupFilters = state.referencedFilters

		//sort styles by program desc and weight asc
		state.allStyles = sortArrayMultipleProps(
			state.allStyles,
			'program',
			'weight'
		)

		//set current subset of total collection to total collection

		state.currentStyles = state.allStyles
		state.activeFilter = {
			filterId: null,
			name: '',
			styleIds: []
		}
	},

	[SET_GROUP_BY_IDENTIFIER.mutation](state, groupId) {
		state.activeFilter = {
			filterId: null,
			name: '',
			styleIds: []
		}
		if (!groupId || groupId == '') {
			state.activeGroup = null
			state.activeGroupIndex = -1

			state.currentStyles = state.allStyles
			state.groupFilters = state.referencedFilters
		} else {
			state.activeGroup = state.allGroups.filter(e => e.groupId === groupId)[0]
			state.activeGroupIndex = state.allGroups.indexOf(state.activeGroup)

			state.currentStyles = state.activeGroup.styles
			state.groupFilters = state.activeGroup.filters
		}
	},

	[SET_GROUP_BY_INDEX.mutation](state, newIndex) {
		if (window.GS_LOGS)
			console.warn('SET_GROUP_BY_INDEX | newIndex=' + newIndex)
		//
		state.activeFilter = {
			filterId: null,
			name: '',
			styleIds: []
		}
		state.activeGroupIndex = newIndex
		if (state.activeGroupIndex == -1) {
			state.activeGroup = null
			state.activeGroupIndex = -1

			state.currentStyles = state.allStyles
			state.groupFilters = state.referencedFilters
		} else {
			state.activeGroup = state.allGroups[state.activeGroupIndex]

			state.currentStyles = state.activeGroup.styles
			state.groupFilters = state.activeGroup.filters
		}
	},

	[SET_CURRENT_FILTER.mutation](state, filterId) {
		if (!state.activeGroup) {
			state.currentStyles = state.allStyles
		} else {
			state.currentStyles = state.activeGroup.styles
		}
		if (!filterId || filterId == '') {
			state.activeFilter = {
				filterId: null,
				name: '',
				styleIds: []
			}
		} else {
			// set current collection to filtered by params
			state.activeFilter = state.groupFilters.filter(
				e => e.filterId === filterId
			)[0]

			let styleIds = state.activeFilter.styleIds
			let newCurrentStyles = findArrayMatches(
				styleIds,
				state.currentStyles,
				'styleId'
			)
			console.log('newCurrentStyles', newCurrentStyles)
			newCurrentStyles = newCurrentStyles.sort((a, b) =>
				a.weight > b.weight ? -1 : 1
			)
			state.currentStyles = newCurrentStyles
		}
	},

	[ALL_ASSETS_VISIBLE.mutation](state, styleItem) {
		let listStyle = state.allStyles.filter(
			e => e.styleId === styleItem.styleId
		)[0]
		let sial = listStyle.assets.length

		for (var i = 0; i < sial; i++) {
			let asset = listStyle.assets[i]
			asset.visible = true
		}
	},
	[ADD_TO_WISHLIST.mutation](state, styleItem) {
		if (styleItem.onWishList) return false
		else {
			let listStyle = state.allStyles.filter(
				e => e.styleId === styleItem.styleId
			)[0]
			listStyle.onWishList = true
			state.wishList.push(styleItem)
		}
	},
	[REMOVE_FROM_WISHLIST.mutation](state, styleItem) {
		if (!styleItem.onWishList) return false
		else {
			let listStyle = state.allStyles.filter(
				e => e.styleId === styleItem.styleId
			)[0]
			listStyle.onWishList = false
			state.wishList = state.wishList.filter(
				e => e.styleId !== styleItem.styleId
			)
		}
	},
	[SHOW_PREVIOUS_STYLE.mutation](state, styleId) {
		let listStyle = state.currentStyles.filter(e => e.styleId === styleId)[0]
		console.log(styleId, listStyle, listStyle.index)
	},
	[SHOW_NEXT_STYLE.mutation](state, styleId) {
		let listStyle = state.currentStyles.filter(e => e.styleId === styleId)[0]
		console.log(styleId, listStyle, listStyle.index)
	}
}

export const actions = {
	[ALL_ASSETS_VISIBLE.action]({ commit }, style) {
		commit(ALL_ASSETS_VISIBLE.mutation, style)
	},
	[ADD_TO_WISHLIST.action]({ commit }, style) {
		commit(ADD_TO_WISHLIST.mutation, style)
	},
	[REMOVE_FROM_WISHLIST.action]({ commit }, style) {
		commit(REMOVE_FROM_WISHLIST.mutation, style)
	},
	[SET_CURRENT_FILTER.action]({ commit }, filterId) {
		// ex 'c2'
		commit(SET_CURRENT_FILTER.mutation, filterId)
	},
	[SET_GROUP_BY_IDENTIFIER.action]({ commit }, groupId) {
		// ex 'drop1-nov'
		commit(SET_GROUP_BY_IDENTIFIER.mutation, groupId)
	},
	[SET_NEXT_GROUP.action]({ commit, state }) {
		let newIndex
		if (state.activeGroupIndex === -1) {
			//currently showing all, show first group
			newIndex = 0
		} else {
			newIndex =
				state.activeGroupIndex === state.allGroups.length - 1
					? -1
					: state.activeGroupIndex + 1
		}
		console.log('next', newIndex)
		commit(SET_GROUP_BY_INDEX.mutation, newIndex)
	},
	[SET_PREVIOUS_GROUP.action]({ commit, state }) {
		let newIndex
		if (state.activeGroupIndex === -1) {
			//currently showing all, show last group
			newIndex = state.allGroups.length - 1
		} else {
			newIndex = stte.activeGroupIndex === 0 ? -1 : state.activeGroupIndex - 1
		}

		commit(SET_GROUP_BY_INDEX.mutation, newIndex)
	},
	[SHOW_PREVIOUS_STYLE.action]({ commit, dispatch, state }, styleId) {
		dispatch(
			CLOSE_WINDOW_GROUP.action,
			{ styleWindowGroup: true },
			{ root: true }
		)

		let listStyle = state.currentStyles.filter(e => e.styleId === styleId)[0]

		if (!listStyle) return false

		let styleCount = state.currentStyles.length,
			listStyleIndex = state.currentStyles.indexOf(listStyle),
			index = listStyleIndex,
			nextIndex = index === 0 ? styleCount - 1 : index - 1,
			prevStyle = state.currentStyles[nextIndex]

		if (prevStyle) {
			dispatch(OPEN_STYLE_CONTENT.action, prevStyle.styleId, { root: true })
		}
	},
	[SHOW_NEXT_STYLE.action]({ commit, dispatch, state }, styleId) {
		dispatch(
			CLOSE_WINDOW_GROUP.action,
			{ styleWindowGroup: true },
			{ root: true }
		)

		let listStyle = state.currentStyles.filter(e => e.styleId === styleId)[0]

		if (!listStyle) return false

		let styleCount = state.currentStyles.length,
			listStyleIndex = state.currentStyles.indexOf(listStyle),
			index = listStyleIndex,
			nextIndex = index === styleCount - 1 ? 0 : index + 1,
			nextStyle = state.currentStyles[nextIndex]

		if (nextStyle) {
			dispatch(OPEN_STYLE_CONTENT.action, nextStyle.styleId, { root: true })
		}
	}
}
