import sortArrayMultipleProps from '~/utils/sort-array-multiple'
import findArrayMatches from '~/utils/find-array-matches'

import {
	INDEX_COLLECTION_DATA,
	SET_CURRENT_FILTER,
	SET_CURRENT_GROUP,
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
	list: [],
	filters: [],
	groups: [],

	filtersParsed: false,
	assetsConnected: false,

	currentStyles: [],

	activeGroup: null,
	activeGroupIndex: -1,

	availableFilters: null,

	groupFilters: null,

	activeFilter: {
		filterId: null,
		name: '',
		styleIds: []
	},

	wishList: []
})

export const mutations = {
	[ALL_ASSETS_VISIBLE.mutation](state, styleItem) {
		let listStyle = state.list.filter(e => e.styleId === styleItem.styleId)[0]
		let sial = listStyle.assets.length

		for (var i = 0; i < sial; i++) {
			let asset = listStyle.assets[i]
			asset.visible = true
		}
	},
	[ADD_TO_WISHLIST.mutation](state, styleItem) {
		if (styleItem.onWishList) return false
		else {
			let listStyle = state.list.filter(e => e.styleId === styleItem.styleId)[0]
			listStyle.onWishList = true
			state.wishList.push(styleItem)
		}
	},
	[REMOVE_FROM_WISHLIST.mutation](state, styleItem) {
		if (!styleItem.onWishList) return false
		else {
			let listStyle = state.list.filter(e => e.styleId === styleItem.styleId)[0]
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
	},

	[INDEX_COLLECTION_DATA.mutation](state) {
		// run through data, make reference lists for each filter

		if (window.GS_LOGS)
			console.warn(
				'FILTER COLLECTION | state.filtersParsed:' + state.filtersParsed
			)

		if (state.filtersParsed) return false

		let cl = state.list.length

		state.availableFilters = []

		//parse all styles into groups, make deep copies!
		for (var i = 0; i < cl; i++) {
			let style = state.list[i]

			//add style to group
			let stateGroup = state.groups.filter(e => e.groupId === style.groupId)[0]
			let clonedStyle = JSON.parse(JSON.stringify(style))
			stateGroup.styles.push(clonedStyle)
		}

		//parse groups
		let gl = state.groups.length
		for (var j = 0; j < gl; j++) {
			let stateGroup = state.groups[j]

			//go through all styles in group
			let gsl = stateGroup.styles.length
			for (var k = 0; k < gsl; k++) {
				let style = stateGroup.styles[k]

				//extrapolate filters from styles
				let fl = style.filters.length
				for (var l = 0; l < fl; l++) {
					let styleFilterId = style.filters[l]
					let stateFilter = state.filters.filter(
						e => e.filterId === styleFilterId
					)[0]

					//clone filter, add to stategroup filters and availableFilters (=ALL)

					let clonedFilter = JSON.parse(JSON.stringify(stateFilter))
					var foundStateGroupFilter = stateGroup.filters.filter(
						e => e.filterId === styleFilterId
					)[0]
					if (!foundStateGroupFilter) stateGroup.filters.push(clonedFilter)

					let clonedFilter2 = JSON.parse(JSON.stringify(stateFilter))
					clonedFilter2.styleIds.push(style.styleId)
					var foundAvailableFilter = state.availableFilters.filter(
						e => e.filterId === styleFilterId
					)[0]
					if (!foundAvailableFilter) state.availableFilters.push(clonedFilter2)
					else foundAvailableFilter.styleIds.push(style.styleId)
				}
			}
		}

		//parse groups again

		for (var j = 0; j < gl; j++) {
			let stateGroup = state.groups[j]

			//go through all styles in group
			let gsl = stateGroup.filters.length
			for (var k = 0; k < gsl; k++) {
				let style = stateGroup.styles[k]

				//extrapolate filters from styles
				let fl = style.filters.length
				for (var l = 0; l < fl; l++) {
					let styleFilterId = style.filters[l]
					var foundStateGroupFilter = stateGroup.filters.filter(
						e => e.filterId === styleFilterId
					)[0]

					//add group style to matching filter
					foundStateGroupFilter.styleIds.push(style.styleId)
				}
			}
		}

		//sort filters by order
		state.availableFilters = state.availableFilters.sort((a, b) =>
			a.order > b.order ? 1 : -1
		)

		//sort groups by order
		state.groups = state.groups.sort((a, b) => (a.order > b.order ? 1 : -1))

		//set groupFilters to savailableFilters (= ALL)
		state.groupFilters = state.availableFilters

		//sort styles by program desc and weight asc
		state.list = sortArrayMultipleProps(state.list, 'program', 'weight')

		//set current subset of total collection to total collection

		state.currentStyles = state.list
		state.activeFilter = {
			filterId: null,
			name: '',
			styleIds: []
		}
	},
	[SET_CURRENT_GROUP.mutation](state, groupId) {
		state.activeFilter = {
			filterId: null,
			name: '',
			styleIds: []
		}
		if (!groupId || groupId == '') {
			state.activeGroup = null
			state.activeGroupIndex = -1

			state.currentStyles = state.list
			state.groupFilters = state.availableFilters
		} else {
			state.activeGroup = state.groups.filter(e => e.groupId === groupId)[0]
			state.activeGroupIndex = state.groups.indexOf(state.activeGroup)

			state.currentStyles = state.activeGroup.styles
			state.groupFilters = state.activeGroup.filters
		}
	},

	[SET_NEXT_GROUP.mutation](state) {
		state.activeFilter = {
			filterId: null,
			name: '',
			styleIds: []
		}
		if (!state.activeGroup) {
			state.activeGroupIndex = 0
			state.activeGroup = state.groups[state.activeGroupIndex]

			state.currentStyles = state.activeGroup.styles
			state.groupFilters = state.activeGroup.filters
		} else {
			state.activeGroupIndex++
			if (state.activeGroupIndex == state.groups.length) {
				//back to ALL
				state.activeGroup = null
				state.activeGroupIndex = -1

				state.currentStyles = state.list
				state.groupFilters = state.availableFilters
			} else {
				state.activeGroup = state.groups[state.activeGroupIndex]

				state.currentStyles = state.activeGroup.styles
				state.groupFilters = state.activeGroup.filters
			}
		}
	},

	[SET_PREVIOUS_GROUP.mutation](state) {
		state.activeFilter = {
			filterId: null,
			name: '',
			styleIds: []
		}
		if (!state.activeGroup) {
			state.activeGroupIndex = state.groups.length - 1
			state.activeGroup = state.groups[state.activeGroupIndex]

			state.currentStyles = state.activeGroup.styles
			state.groupFilters = state.activeGroup.filters
		} else {
			state.activeGroupIndex--
			if (state.activeGroupIndex == -1) {
				//back to ALL
				state.activeGroup = null
				state.currentStyles = state.list
				state.groupFilters = state.availableFilters
			} else {
				state.activeGroup = state.groups[state.activeGroupIndex]

				state.currentStyles = state.activeGroup.styles
				state.groupFilters = state.activeGroup.filters
			}
		}
	},

	[SET_CURRENT_FILTER.mutation](state, filterId) {
		if (!filterId || filterId == '') {
			if (!state.activeGroup) {
				state.currentStyles = state.list
			} else {
				state.currentStyles = state.activeGroup.styles
			}
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
	[SET_CURRENT_GROUP.action]({ commit }, groupId) {
		// ex 'drop1-nov'
		commit(SET_CURRENT_GROUP.mutation, groupId)
	},
	[SET_NEXT_GROUP.action]({ commit }) {
		commit(SET_NEXT_GROUP.mutation)
	},
	[SET_PREVIOUS_GROUP.action]({ commit }) {
		commit(SET_PREVIOUS_GROUP.mutation)
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
			index = listStyle.index,
			nextIndex = index === 0 ? styleCount - 1 : index - 1,
			prevStyle = state.currentStyles.filter(e => e.index === nextIndex)[0]

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
			index = listStyle.index,
			nextIndex = index === styleCount - 1 ? 0 : index + 1,
			nextStyle = state.currentStyles.filter(e => e.index === nextIndex)[0]

		if (nextStyle) {
			dispatch(OPEN_STYLE_CONTENT.action, nextStyle.styleId, { root: true })
		}
	}
}
