import {
	RESET_STATE,
	EXHIBITION_FETCH,
	EXHIBITION_ASSETS_FETCH,
	COLLECTION_ITEMS_FETCH,
	COLLECTION_GROUPS_FETCH,
	COLLECTION_FILTERS_FETCH,
	COLLECTION_ASSETS_FETCH,
	FILMS_FETCH,
	GANNIGIRLS_FETCH,
	LOOKBOOK_FETCH,
	GENERAL_FETCH,
	TOPMOST_WINDOW,
	UPDATE_WINDOW,
	CLOSE_WINDOW,
	CLOSE_WINDOW_GROUP,
	OPEN_CONTENT,
	OPEN_GALLERY,
	OPEN_WISH_LIST,
	OPEN_STYLE_CONTENT,
	PASSWORDS_FETCH
} from '~/model/constants'

import ContentTypes from '~/model/content-types'
import _ from 'lodash'

import getUniqueId from '~/utils/get-unique-id'
import getOptimalProp from '~/utils/get-optimal-props'
import resetZOrder from '~/utils/reset-z-order'
import getAssetType from '~/utils/asset-type'

export const state = () => ({
	rehydrated: false,

	windowList: [],
	windowGroupList: [],
	topMostWindow: null,
	highestZIndex: 0
})

export const mutations = {
	// Baseline content to cms

	// fired when nuxt has access to the store
	rehydrated(state) {
		state.rehydrated = true
	},

	[RESET_STATE.mutation](state) {
		state.collection.wishList = []
		state.progressBar.progressPct = 0
		Object.keys(ContentTypes).forEach(type => {
			state.progressBar.progressItems[type].complete = false
		})
		state.user.loggedIn = false
		state.user.cookiesAccepted = false
		state.user.copyrightAccepted = false
	},

	/*
	 *	Activate content block, opens window with matching contentComponent
	 *
	 */
	[OPEN_CONTENT.mutation](state, params) {
		if (window.GS_LOGS) console.warn('OPEN_CONTENT', params)

		let windowGroup = params.addToGroupId
			? state.windowGroupList.find(e => e.groupId === params.addToGroupId)
			: {
					groupId: '' + getUniqueId(),
					windowIds: [],
					contentIds: [],
					groupSize: 0
			  }

		if (params.styleWindowGroup) windowGroup.styleWindowGroup = true

		params.windowContent.forEach(content => {
			const hasSame = prop => x => x[prop] === content[prop]

			let alreadyExists =
				state.content.list.filter(hasSame('contentId')).length > 0

			// don't open a window twice
			if (alreadyExists) return

			const newWindow = getOptimalProp(state, content, windowGroup.groupId)
			newWindow.windowProps.nthChild = windowGroup.groupSize

			state.windowList.unshift(newWindow)
			state.content.list.unshift(newWindow)

			windowGroup.windowIds.push(newWindow.windowId)
			windowGroup.contentIds.push(newWindow.contentId)
			windowGroup.groupSize++

			state.topMostWindow = newWindow

			//FLAG PROGRESS!
			state.progressBar.progressItems[
				newWindow.contentType.name
			].complete = true
		})

		//only add the group if it has content
		if (windowGroup.groupSize > 0 && !params.addToGroupId)
			state.windowGroupList.push(windowGroup)

		//calculate progress
		let pIA = Object.entries(state.progressBar.progressItems)
		let pIL = pIA.length
		let pIC = 0
		for (let [key, value] of pIA) {
			if (value.complete) pIC += value.score
		}

		state.progressBar.progressPct = Math.round(
			(pIC / state.progressBar.progressMax) * 100
		)

		let wll = state.windowList.length

		state.windowList = resetZOrder(state.windowList)
		state.highestZIndex = state.windowList[wll - 1].positionZ
	},
	/*
	 *	Save window position and size values
	 *
	 */
	[UPDATE_WINDOW.mutation](state, params) {
		let currentWindow = state.windowList.filter(
			e => e.windowId === params.windowId
		)[0]
		for (var key in params.windowProps) {
			currentWindow.windowProps[key] = params.windowProps[key]
		}
	},
	/*
	 *	Bring window to top.
	 *
	 */
	[TOPMOST_WINDOW.mutation](state, windowId) {
		if (window.GS_LOGS) console.warn('TOPMOST_WINDOW', windowId)
		let wll = state.windowList.length

		//console.log("zIndexes after",state.zIndexes)

		let matchingWindow = state.windowList.filter(
			e => e.windowId === windowId
		)[0]

		if (matchingWindow) {
			matchingWindow.positionZ = state.highestZIndex + 1
			state.windowList = resetZOrder(state.windowList)
			state.highestZIndex = state.windowList[wll - 1].positionZ
			state.topMostWindow = matchingWindow
		}
	},

	/*
	 *	Single window close. Wipes window group history, so user has to close all windows individually after
	 *
	 */
	[CLOSE_WINDOW.mutation](state, ids) {
		state.content.list = state.content.list.filter(
			e => e.contentId !== ids.contentId
		)

		let currentWindow = state.windowList.filter(
			e => e.windowId === ids.windowId
		)[0]

		//remove window
		state.windowList = state.windowList.filter(e => e.windowId !== ids.windowId)

		//search for and remove dead ids in groups
		let groupsLength = state.windowGroupList.length
		if (groupsLength > 0) {
			for (var i = groupsLength - 1; i >= 0; i--) {
				let windowGroup = state.windowGroupList[i]
				if (windowGroup.windowIds.indexOf(ids.windowId) > -1) {
					//if id found in id list, remove it
					windowGroup.windowIds.splice(
						windowGroup.windowIds.indexOf(ids.windowId),
						1
					)
				}
				if (windowGroup.windowIds.length == 0) {
					//if no ids left, remove group
					state.windowGroupList.splice(i, 1)
				}
			}
		}

		state.windowList = resetZOrder(state.windowList)
		let wll = state.windowList.length

		if (wll == 0) {
			state.highestZIndex = 0
		} else {
			state.highestZIndex = state.windowList[wll - 1].positionZ
		}
		state.topMostWindow = state.windowList[wll - 1]

		if (window.GS_LOGS)
			console.warn(
				'CLOSE_WINDOW | removed id:' +
					ids.windowId +
					', remaining windows: ' +
					state.windowList.length
			)
	},
	/*
	 *	Close a window group. Closes the last added group.
	 *
	 */
	[CLOSE_WINDOW_GROUP.mutation](state, params) {
		let groupsLength = state.windowGroupList.length

		if (groupsLength < 1) return false

		let windowGroup = state.windowGroupList[groupsLength - 1] //get latest group

		if (params && params.styleWindowGroup) {
			windowGroup = state.windowGroupList.filter(
				e => e.styleWindowGroup === true
			)[0]
		}

		if (!windowGroup) return false

		for (var i = 0; i < windowGroup.groupSize; i++) {
			let ids = {
				windowId: windowGroup.windowIds[i],
				contentId: windowGroup.contentIds[i]
			}

			state.content.list = state.content.list.filter(
				e => e.contentId !== ids.contentId
			)

			let currentWindow = state.windowList.filter(
				e => e.windowId === ids.windowId
			)[0]
			state.windowList = state.windowList.filter(
				e => e.windowId !== ids.windowId
			)
		}

		state.windowGroupList.pop() //remove that group
		if (window.GS_LOGS)
			console.warn(
				'CLOSE_WINDOW_GROUP | remaining groups: ' +
					state.windowGroupList.length +
					' | close style? ' +
					(params && params.styleWindowGroup)
			)

		state.windowList = resetZOrder(state.windowList)
		let wll = state.windowList.length

		if (wll == 0) {
			state.highestZIndex = 0
		} else {
			state.highestZIndex = state.windowList[wll - 1].positionZ
		}
		state.topMostWindow = state.windowList[wll - 1]
	}
}

export const actions = {
	[TOPMOST_WINDOW.action]({ commit }, windowId) {
		commit(TOPMOST_WINDOW.mutation, windowId)
	},

	[CLOSE_WINDOW.action]({ commit }, ids) {
		commit(CLOSE_WINDOW.mutation, ids)
	},
	[OPEN_CONTENT.action]({ commit }, content) {
		commit(OPEN_CONTENT.mutation, content)
	},
	[CLOSE_WINDOW_GROUP.action]({ commit }, params) {
		commit(CLOSE_WINDOW_GROUP.mutation, params)
	},
	[UPDATE_WINDOW.action]({ commit }, params) {
		commit(UPDATE_WINDOW.mutation, params)
	},

	[OPEN_STYLE_CONTENT.action]({ commit, state }, styleId) {
		let listStyle = state.collection.allStyles.filter(
			e => e.styleId === styleId
		)[0]
		if (!listStyle) return false

		let content = []
		let al = listStyle.assets.length

		//backwards loop to ensure asset [0] gets on top (as sorted in $store)
		for (var i = al - 1; i >= 0; i--) {
			let asset = listStyle.assets[i]

			if (asset.visible) {
				let type = getAssetType(asset)

				content.push({
					title: asset.name,
					contentId: asset.assetId,
					type: type,
					canOverride: false,
					windowProps: type.defaultWindowProps,
					contentComponentProps: { asset: asset },
					statusComponentProps: type.defaultStatusComponentProps
				})
			}
		}

		commit(CLOSE_WINDOW_GROUP.mutation, { styleWindowGroup: true })
		commit(OPEN_CONTENT.mutation, {
			windowContent: content,
			styleWindowGroup: true
		})
	},
	[OPEN_GALLERY.action]({ commit }, asset) {
		let galleryContent = [
			{
				title: 'Zoom window',
				contentId: 'gallery',
				type: ContentTypes.gallery,
				canOverride: true,
				contentComponentProps: {
					styleId: asset.styleId,
					focusedAssetId: asset.assetId
				}
			}
		]
		commit(OPEN_CONTENT.mutation, { windowContent: galleryContent })
	},

	[OPEN_WISH_LIST.action]({ commit }, asset) {
		let wishListContent = [
			{
				title: 'Your wishlist',
				contentId: 'wish-list',
				type: ContentTypes.wishList,
				canOverride: false
			}
		]
		commit(OPEN_CONTENT.mutation, { windowContent: wishListContent })
	},

	[RESET_STATE.action]({ commit }) {
		commit(RESET_STATE.mutation)
	},

	/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

	// FETCH ALL CONTENT!

	async nuxtServerInit({ commit, dispatch, state }) {
		const getData = async req => {
			let files = await req
			return files.keys().map(key => {
				let res = files(key)
				res.slug = key.slice(2, -5)
				return res
			})
		}

		commit(
			'exhibition/' + EXHIBITION_FETCH.mutation,
			await getData(
				require.context(`~/assets/content/exhibition/`, false, /\.json$/)
			)
		)

		commit(
			'exhibition/' + EXHIBITION_ASSETS_FETCH.mutation,
			await getData(
				require.context(`~/assets/content/exhibitionAssets/`, false, /\.json$/)
			)
		)

		commit(
			'collection/' + COLLECTION_ITEMS_FETCH.mutation,
			await getData(
				require.context('~/assets/content/collectionItems/', false, /\.json$/)
			)
		)

		commit(
			'collection/' + COLLECTION_FILTERS_FETCH.mutation,
			await getData(
				require.context('~/assets/content/collectionFilters/', false, /\.json$/)
			)
		)

		commit(
			'collection/' + COLLECTION_GROUPS_FETCH.mutation,
			await getData(
				require.context('~/assets/content/collectionGroups/', false, /\.json$/)
			)
		)

		commit(
			'collection/' + COLLECTION_ASSETS_FETCH.mutation,
			await getData(
				require.context('~/assets/content/mediaAssets/', false, /\.json$/)
			)
		)

		commit(
			'assets/' + FILMS_FETCH.mutation,
			await getData(
				require.context('~/assets/content/films/', false, /\.json$/)
			)
		)

		commit(
			'assets/' + GANNIGIRLS_FETCH.mutation,
			await getData(
				require.context('~/assets/content/ganniGirls/', false, /\.json$/)
			)
		)

		commit(
			'assets/' + LOOKBOOK_FETCH.mutation,
			await getData(
				require.context('~/assets/content/lookBook/', false, /\.json$/)
			)
		)

		commit('assets/' + GENERAL_FETCH.mutation, {
			data: await getData(
				require.context('~/assets/content/general/', false, /\.json$/)
			),
			rootState: state
		})

		commit(
			'user/' + PASSWORDS_FETCH.mutation,
			await getData(
				require.context('~/assets/content/passwords/', false, /\.json$/)
			)
		)

		console.log('NUXT SERVER INIT DONE')
	}
}
