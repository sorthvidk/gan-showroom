import {
	RESET_STATE,
	LOGIN,
	VISIBILITY,
	COPYRIGHT_ACCEPT,
	COOKIES_ACCEPT,
	COLLECTION_ITEMS_FETCH,
	COLLECTION_FILTERS_FETCH,
	COLLECTION_ASSETS_FETCH,
	FILMS_FETCH,
	GANNIGIRLS_FETCH,
	LOOKBOOK_FETCH,
	GENERAL_FETCH,
	CONNECT_ASSETS,
	FILTER_COLLECTION,
	COLLECTION_LAYOUT_CHANGE,
	INIT_PROGRESS,
	KEYPRESS,
	MOUSEMOVE,
	MUSIC_PLAY_PAUSE,
	FORCE_STOP_MUSIC,
	TOPMOST_WINDOW,
	UPDATE_WINDOW,
	CLOSE_WINDOW,
	CLOSE_WINDOW_GROUP,
	OPEN_CONTENT,
	OPEN_GALLERY,
	OPEN_WISH_LIST,
	OPEN_STYLE_CONTENT,
	CLIPBOARD_COPY,
	DOWNLOAD_PREPARING,
	SAVE_AS_BACKGROUND,
	COLLAGE_IS_OPEN,
	SAVE_COLLAGE,
	MAKE_BACKGROUND,
	CHANGE_COLLAGE
} from '~/model/constants'

import ContentTypes from '~/model/content-types'
import CollectionLayouts from '~/model/collection-layouts'
import _ from 'lodash'

import getUniqueId from '~/utils/get-unique-id'
import getOptimalProp from '~/utils/get-optimal-props'
import resetZOrder from '~/utils/reset-z-order'
import getAssetType from '~/utils/asset-type'

export const state = () => ({
	webcamImage: '',

	collageIsOpen: false,
	saveCollage: false,
	makeBackground: false,
	changeCollage: {},

	loggedIn: false,
	password: [
		'16c1443a039ecd26eadb57f6a0ae297e3d5894560bed02de3434af15cc79c009', // = hampsterdance
		'381634da11c4dfeab891f242e3a979d22fa3c9b7bc45d9830db04d53eca8109d' // jury2021
	],

	screensaverActive: false,

	progressItems: {},
	progressPct: 0,
	progressMax: 0,

	mousepos: { x: 0, y: 0 },

	windowList: [],
	windowGroupList: [],
	topMostWindow: null,

	collectionLayout: CollectionLayouts.GRID,

	keyPressed: null,
	highestZIndex: 0,

	rehydrated: false,
	cookiesAccepted: false,
	copyrightAccepted: false,

	musicPlaying: false,
	songs: [
		{
			title: 'All Saints - Never Ever.mp3',
			src: `/audio/1-01 Never Ever.mp3`
		},
		{
			title: 'Sugababes - Overload.mp3',
			src: `/audio/1-01 Overload.mp3`
		},
		{
			title: 'Nirvana - Come As You Are.mp3',
			src: `/audio/1-03 Come As You Are.mp3`
		},
		{
			title: 'Janet Jackson - Together Again.mp3',
			src: `/audio/1-11 Together Again.mp3`
		},
		{
			title: 'Madonna - Express Yourself.mp3',
			src: `/audio/1-12 Express Yourself.mp3`
		}
	],

	clipBoardCopyComplete: false,
	downloadPreparing: false
})

export const mutations = {
	// Baseline content to cms

	// fired when nuxt has access to the store
	rehydrated(state) {
		state.rehydrated = true
	},

	isOnWishList(state) {
		state.collection.list.forEach(style => {
			const sameStyleId = e => e.styleId === style.styleId
			style.onWishList = state.collection.wishList.find(sameStyleId)
		})
	},

	[SAVE_COLLAGE.mutation](state) {
		state.saveCollage = !state.saveCollage
	},

	[MAKE_BACKGROUND.mutation](state) {
		state.makeBackground = !state.makeBackground
	},

	[COLLAGE_IS_OPEN.mutation](state, open) {
		state.collageIsOpen = open
	},

	[SAVE_AS_BACKGROUND.mutation](state, img) {
		state.webcamImage = img
	},

	[CHANGE_COLLAGE.mutation](state, change) {
		state.changeCollage = change
	},

	[RESET_STATE.mutation](state) {
		state.collection.wishList = []
		state.progressPct = 0
		Object.keys(ContentTypes).forEach(type => {
			state.progressItems[type].complete = false
		})
		state.loggedIn = false
		state.cookiesAccepted = false
		state.copyrightAccepted = false
	},

	[LOGIN.mutation](state, key) {
		state.loggedIn = key
		if (window.GS_LOGS) console.log('state.loggedIn', state.loggedIn)
	},

	[VISIBILITY.mutation](state, key) {
		state.screensaverActive = key
	},

	[COOKIES_ACCEPT.mutation](state) {
		state.cookiesAccepted = true
	},

	[COPYRIGHT_ACCEPT.mutation](state, value) {
		state.copyrightAccepted = value
	},

	[KEYPRESS.mutation](state, key) {
		state.keyPressed = key
	},

	[MOUSEMOVE.mutation](state, { x, y }) {
		state.mousepos = { x, y }
	},

	[COLLECTION_ITEMS_FETCH.mutation](state, data) {
		state.collection.list = data
	},
	[COLLECTION_FILTERS_FETCH.mutation](state, data) {
		state.collection.filters = data
	},
	[COLLECTION_ASSETS_FETCH.mutation](state, data) {
		state.assets.list = data
	},

	[FILMS_FETCH.mutation](state, data) {
		state.assets.films = data
	},
	[GANNIGIRLS_FETCH.mutation](state, data) {
		state.assets.ganniGirls.posts = data
	},
	[LOOKBOOK_FETCH.mutation](state, data) {
		state.assets.lookBook = data
	},
	[GENERAL_FETCH.mutation](state, data) {
		//Insert Ganni Girls bg image
		let misc = data.filter(e => e.slug === 'misc')[0]
		state.assets.ganniGirls.bgImageUrl = misc.ganniGirlsUrl

		//Insert Ditte's letter

		let dittesFolder = state.shortcuts.list.filter(
			e => e.shortcutId === 'dittes-folder'
		)[0]

		if (!dittesFolder) return false
		let content = dittesFolder.windowContent.filter(
			f => f.contentId === 'ditte-letter'
		)

		if (!content) return false
		let props = content[0].contentComponentProps

		if (!props.text) return false
		props.text = misc.ditteLetter
	},

	[CONNECT_ASSETS.mutation](state) {
		if (state.collection.assetsConnected) return false

		let al = state.assets.list.length

		for (var i = 0; i < al; i++) {
			let asset = state.assets.list[i]
			let style = state.collection.list.filter(
				e => e.styleId === asset.styleId
			)[0]
			if (style && style.assets) style.assets.push(asset)
			else if (window.GS_LOGS)
				console.warn('NO STYLE FOR ASSET | styleId: "' + asset.styleId + '"')
		}

		//sort style assets to have onTop asset first in assets array
		let cl = state.collection.list.length
		for (var j = 0; j < cl; j++) {
			let style = state.collection.list[j]
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

		//to ensure only one connection operation
		state.collection.assetsConnected = true
	},

	/*
	 *	Activate content block, opens window with matching contentComponent
	 *
	 */
	[INIT_PROGRESS.mutation](state) {
		Object.keys(ContentTypes).forEach(type => {
			state.progressItems[type] = false
		})

		Object.keys(ContentTypes).forEach(type => {
			state.progressItems[type] = {
				complete: false,
				score: ContentTypes[type].contentScore
			}
		})

		let pIA = Object.entries(state.progressItems)
		let pIL = pIA.length
		let pM = 0
		for (let [key, value] of pIA) {
			pM += value.score
		}
		state.progressMax = pM

		// if ( window.GS_LOGS ) console.warn('INIT_PROGRESS', state.progressItems)
		state.progressPct = 0
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
			const { contentId, canOverride } = content

			const hasSame = prop => x => x[prop] === content[prop]
			const hasNotSame = prop => x => x[prop] !== content[prop]

			let alreadyExists =
				state.content.list.filter(hasSame('contentId')).length > 0

			// in use?
			// if (alreadyExists && canOverride) {
			// 	state.windowList = state.windowList.filter(hasNotSame('contentType'))
			// }

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
			state.progressItems[newWindow.contentType.name].complete = true
		})

		//only add the group if it has content
		if (windowGroup.groupSize > 0 && !params.addToGroupId)
			state.windowGroupList.push(windowGroup)

		//calculate progress
		let pIA = Object.entries(state.progressItems)
		let pIL = pIA.length
		let pIC = 0
		for (let [key, value] of pIA) {
			if (value.complete) pIC += value.score
		}

		state.progressPct = Math.round((pIC / state.progressMax) * 100)

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
		if (params && params.styleWindowGroup)
			windowGroup = state.windowGroupList.filter(
				e => e.styleWindowGroup === true
			)[0]

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
	},

	[MUSIC_PLAY_PAUSE.mutation](state, playing) {
		if (window.GS_LOGS) console.warn('MUSIC_PLAY_PAUSE', playing)
		state.musicPlaying = playing
	},

	[FORCE_STOP_MUSIC.mutation](state, playing) {
		if (window.GS_LOGS) console.warn('FORCE_STOP_MUSIC | pause music')
		state.musicPlaying = false
	},

	[CLIPBOARD_COPY.mutation](state, value) {
		if (window.GS_LOGS) console.warn('CLIPBOARD_COPY')
		state.clipBoardCopyComplete = value
	},

	[DOWNLOAD_PREPARING.mutation](state, value) {
		if (window.GS_LOGS) console.warn('DOWNLOAD_PREPARING')
		state.downloadPreparing = value
	},

	[COLLECTION_LAYOUT_CHANGE.mutation](state, value) {
		if (window.GS_LOGS) console.warn('COLLECTION_LAYOUT_CHANGE')
		state.collectionLayout = value
	}
}

export const actions = {
	//first action, injects assets into collection
	[CONNECT_ASSETS.action]({ commit }) {
		commit(CONNECT_ASSETS.mutation)
	},

	[LOGIN.action]({ commit }, authorized) {
		commit(LOGIN.mutation, authorized)
	},

	[SAVE_COLLAGE.action]({ commit }) {
		commit(SAVE_COLLAGE.mutation)
	},

	[MAKE_BACKGROUND.action]({ commit }) {
		commit(MAKE_BACKGROUND.mutation)
	},

	[COLLAGE_IS_OPEN.action]({ commit }, open) {
		commit(COLLAGE_IS_OPEN.mutation, open)
	},

	[CHANGE_COLLAGE.action]({ commit }, change) {
		commit(CHANGE_COLLAGE.mutation, change)
	},

	[SAVE_AS_BACKGROUND.action]({ commit }, img) {
		commit(SAVE_AS_BACKGROUND.mutation, img)
	},

	[VISIBILITY.action]({ commit }, hidden) {
		commit(VISIBILITY.mutation, hidden)
	},

	[COOKIES_ACCEPT.action]({ commit }, value) {
		commit(COOKIES_ACCEPT.mutation, value)
	},
	[COPYRIGHT_ACCEPT.action]({ commit }, value) {
		commit(COPYRIGHT_ACCEPT.mutation, value)
	},
	[INIT_PROGRESS.action]({ commit }) {
		commit(INIT_PROGRESS.mutation)
	},

	[KEYPRESS.action]({ commit }, event) {
		commit(KEYPRESS.mutation, event)

		if (event.key === 'Escape') {
			commit(CLOSE_WINDOW_GROUP.mutation)
		}
	},

	[MOUSEMOVE.action]({ commit }, event) {
		commit(MOUSEMOVE.mutation, {
			x: event.clientX,
			y: event.clientY
		})
	},
	[TOPMOST_WINDOW.action]({ commit }, windowId) {
		commit(TOPMOST_WINDOW.mutation, windowId)
	},

	[CLOSE_WINDOW.action]({ commit }, ids) {
		commit(CLOSE_WINDOW.mutation, ids)
	},
	[OPEN_CONTENT.action]({ commit }, content) {
		commit(OPEN_CONTENT.mutation, content)
	},
	[CLOSE_WINDOW_GROUP.action]({ commit }) {
		commit(CLOSE_WINDOW_GROUP.mutation)
	},
	[UPDATE_WINDOW.action]({ commit }, params) {
		commit(UPDATE_WINDOW.mutation, params)
	},

	[OPEN_STYLE_CONTENT.action]({ commit, state }, styleId) {
		let listStyle = state.collection.list.filter(e => e.styleId === styleId)[0]
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
	[MUSIC_PLAY_PAUSE.action]({ commit }, playing) {
		if (window.GS_LOGS) console.log('playing', playing)
		if (typeof playing === 'undefined') commit(MUSIC_PLAY_PAUSE.mutation, true)
		else commit(MUSIC_PLAY_PAUSE.mutation, playing)
	},
	[FORCE_STOP_MUSIC.action]({ commit }) {
		commit(FORCE_STOP_MUSIC.mutation)
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

	[CLIPBOARD_COPY.action]({ commit }, value) {
		commit(CLIPBOARD_COPY.mutation, value)
	},
	[DOWNLOAD_PREPARING.action]({ commit }, value) {
		commit(DOWNLOAD_PREPARING.mutation, value)
	},

	[RESET_STATE.action]({ commit }) {
		commit(RESET_STATE.mutation)
	},
	[COLLECTION_LAYOUT_CHANGE.action]({ commit }, value) {
		if (window.GS_LOGS) console.log('value', value)
		commit(COLLECTION_LAYOUT_CHANGE.mutation, value)
	},

	/* ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

	// FETCH ALL CONTENT!

	async nuxtServerInit({ commit, dispatch }) {
		let collectionFiles = await require.context(
			'~/assets/content/collectionItems/',
			false,
			/\.json$/
		)
		let collection = collectionFiles.keys().map(key => {
			let res = collectionFiles(key)
			res.slug = key.slice(2, -5)
			return res
		})
		commit(COLLECTION_ITEMS_FETCH.mutation, collection)

		let filterFiles = await require.context(
			'~/assets/content/collectionFilters/',
			false,
			/\.json$/
		)
		let filters = filterFiles.keys().map(key => {
			let res = filterFiles(key)
			res.slug = key.slice(2, -5)
			return res
		})
		commit(COLLECTION_FILTERS_FETCH.mutation, filters)

		let assetFiles = await require.context(
			'~/assets/content/mediaAssets/',
			false,
			/\.json$/
		)
		let assets = assetFiles.keys().map(key => {
			let res = assetFiles(key)
			res.slug = key.slice(2, -5)
			return res
		})
		commit(COLLECTION_ASSETS_FETCH.mutation, assets)

		let filmsFiles = await require.context(
			'~/assets/content/films/',
			false,
			/\.json$/
		)
		let films = filmsFiles.keys().map(key => {
			let res = filmsFiles(key)
			res.slug = key.slice(2, -5)
			return res
		})
		commit(FILMS_FETCH.mutation, films)

		let ganniGirlsFiles = await require.context(
			'~/assets/content/ganniGirls/',
			false,
			/\.json$/
		)
		let posts = ganniGirlsFiles.keys().map(key => {
			let res = ganniGirlsFiles(key)
			res.slug = key.slice(2, -5)
			return res
		})
		commit(GANNIGIRLS_FETCH.mutation, posts)

		let lookBookFiles = await require.context(
			'~/assets/content/lookBook/',
			false,
			/\.json$/
		)
		let lookBook = lookBookFiles.keys().map(key => {
			let res = lookBookFiles(key)
			res.slug = key.slice(2, -5)
			return res
		})
		commit(LOOKBOOK_FETCH.mutation, lookBook)

		let generalFiles = await require.context(
			'~/assets/content/general/',
			false,
			/\.json$/
		)
		let general = generalFiles.keys().map(key => {
			let res = generalFiles(key)
			res.slug = key.slice(2, -5)
			return res
		})
		commit(GENERAL_FETCH.mutation, general)

		console.log('NUXT SERVER INIT DONE')
	}
}
