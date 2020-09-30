import sortArrayMultipleProps from '~/utils/sort-array-multiple'

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

		for (var i = 0; i < cl; i++) {
			let style = state.list[i]
			if (typeof style.filters != 'undefined') {
				let fl = style.filters.length

				for (var j = 0; j < fl; j++) {
					let styleFilter = style.filters[j]
					let stateFilter = state.filters.filter(
						e => e.filterId === styleFilter
					)[0]
					if (stateFilter) stateFilter.styleIds.push(style.styleId)
				}
			} else {
				if (window.GS_LOGS)
					console.warn('NO FILTERS FOR STYLE: ' + style.styleId)
			}

			let stateGroup = state.groups.filter(e => e.groupId === style.groupId)[0]

			if (stateGroup) stateGroup.styleIds.push(style.styleId)
		}

		//sort filters by order
		state.filters = state.filters.sort((a, b) => (a.order > b.order ? 1 : -1))

		//sort groups by order
		state.groups = state.groups.sort((a, b) => (a.order > b.order ? 1 : -1))

		//sort styles by weight
		// state.list.sort((a, b) => (a.weight > b.weight ? -1 : 1))

		// let l1 = [
		// 	{weight:7,program:608},
		// 	{weight:234,program:908},
		// 	{weight:1,program:908},
		// 	{weight:4,program:608},
		// 	{weight:133,program:608},
		// ]

		// sortArrayMultipleProps(l1,'program','weight')
		// console.table(l1)

		//sort styles by program desc and weight asc
		state.list = sortArrayMultipleProps(state.list, 'program', 'weight')

		//set current subset of total collection to total collection

		state.currentStyles = state.list
		state.activeFilter = {
			filterId: null,
			name: '',
			styleIds: []
		}

		state.filtersParsed = true
	},
	[SET_CURRENT_GROUP.mutation](state, groupId) {
		console.warn('SET_CURRENT_GROUP', groupId)
		if (!groupId || groupId == '') {
			state.currentStyles = state.list
			state.activeGroup = null
			state.activeGroupIndex = -1
		} else {
			state.activeGroup = state.groups.filter(e => e.groupId === groupId)[0]
			state.activeGroupIndex = state.groups.indexOf(state.activeGroup)

			state.currentStyles = state.list.filter(e => e.groupId === groupId)
		}
	},

	[SET_NEXT_GROUP.mutation](state) {
		if (!state.activeGroup) {
			state.activeGroupIndex = 0
			state.activeGroup = state.groups[state.activeGroupIndex]
			state.currentStyles = state.list.filter(
				e => e.groupId === state.activeGroup.groupId
			)
		} else {
			state.activeGroupIndex++
			if (state.activeGroupIndex == state.groups.length) {
				//back to ALL
				state.currentStyles = state.list
				state.activeGroup = null
				state.activeGroupIndex = -1
			} else {
				state.activeGroup = state.groups[state.activeGroupIndex]
				state.currentStyles = state.list.filter(
					e => e.groupId === state.activeGroup.groupId
				)
			}
		}
	},

	[SET_PREVIOUS_GROUP.mutation](state) {
		if (!state.activeGroup) {
			state.activeGroupIndex = state.groups.length - 1
			state.activeGroup = state.groups[state.activeGroupIndex]
			state.currentStyles = state.list.filter(
				e => e.groupId === state.activeGroup.groupId
			)
		} else {
			state.activeGroupIndex--
			if (state.activeGroupIndex == -1) {
				//back to ALL
				state.currentStyles = state.list
				state.activeGroup = null
			} else {
				state.activeGroup = state.groups[state.activeGroupIndex]
				state.currentStyles = state.list.filter(
					e => e.groupId === state.activeGroup.groupId
				)
			}
		}
	},

	[SET_CURRENT_FILTER.mutation](state, filterId) {
		if (!filterId || filterId == '') {
			let cl = state.list.length

			for (var j = 0; j < cl; j++) {
				state.list[j].index = j
			}

			state.currentStyles = state.list
			state.activeFilter = {
				filterId: null,
				name: '',
				styleIds: []
			}
		} else {
			// set current collection to filtered by params
			state.activeFilter = state.filters.filter(e => e.filterId === filterId)[0]
			let styleIds = state.activeFilter.styleIds
			if (window.GS_LOGS)
				console.warn(
					'SET CURRENT FILTER | filterId:' +
						filterId +
						' | styleIds:' +
						styleIds
				)
			let sil = styleIds.length
			let newCurrentStyles = []

			for (var i = 0; i < sil; i++) {
				let styleId = styleIds[i]
				let addedStyle = state.list.filter(e => e.styleId === styleId)[0]
				addedStyle.index = i
				newCurrentStyles.push(addedStyle)
			}
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
