import {
	LOGIN,
	COOKIES_ACCEPT,
	WALLPAPER_CHANGE,
	COLLECTION_ITEMS_FETCH,
	COLLECTION_FILTERS_FETCH,
	COLLECTION_ASSETS_FETCH,
	FILMS_FETCH,
	GANNIGIRLS_FETCH,
	LOOKBOOK_FETCH,
	GENERAL_FETCH,
	CONNECT_ASSETS,
	FILTER_COLLECTION,
	INIT_PROGRESS,
	KEYPRESS,
	MOUSEMOVE,
	TOGGLE_MUSIC_PLAYER,
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
	DOWNLOAD_PREPARING
} from '~/model/constants'

import ContentTypes from '~/model/content-types'
import _ from 'lodash'

import getUniqueId from '~/utils/get-unique-id'
import getOptimalProp from '~/utils/get-optimal-props'
import resetZOrder from '~/utils/reset-z-order'
import getAssetType from '~/utils/asset-type'

export const state = () => ({
	wallpaperIndex: 0,
	wallpaperCount: 6,

	loggedIn: false,
	password: '4c9886c623963308307d41bff8ae065ef8b2aff6c86eeb04227d4a8499ddd20e', // = ganni

	progressItems: {},
	progressPct: 0,
	progressMax: 0,

	windowList: [],
	windowGroupList: [],
	topMostWindow: null,

	keyPressed: null,
	highestZIndex: 0,

	cookiesAccepted: false,

	musicPlayerOpen: false,
	musicPlaying: false,
	songs: [
		{
			title: 'Dance Music Mix 2001 - Track 02 - Kylie Minogue.mp3',
			src: `/audio/Kylie-Minogue.mp3`
		},
		{
			title: 'Pete-Hellers-Big-Love-Big-Love.mp3',
			src: `/audio/Pete-Hellers-Big-Love-Big-Love.mp3`
		},
		{
			title: 'show_me_love.mp3',
			src: `/audio/Robin-S-Show-Me-Love.mp3`
		},
		{
			title: '(BETTER_QUALITY)_320kbps_Moloko-Sing-It-Back.mp3',
			src: `/audio/Moloko-Sing-It-Back.mp3`
		},
		{
			title: 'Track_06-Haddaway-What_is_love.mp3',
			src: `/audio/What-Is-Love.mp3`
		}
	],

	clipBoardCopyComplete: false,
	downloadPreparing: false
})

export const mutations = {
	// Baseline content to cms

	[LOGIN.mutation](state, key) {
		state.loggedIn = key
		console.log('state.loggedIn', state.loggedIn)
	},

	[WALLPAPER_CHANGE.mutation](state) {
		state.wallpaperIndex = state.wallpaperIndex + 1
		if (state.wallpaperIndex > state.wallpaperCount) {
			state.wallpaperIndex = 1
		}
	},

	[COOKIES_ACCEPT.mutation](state) {
		state.cookiesAccepted = true
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
			if (!style || !style.assets)
				console.warn('NO STYLE FOR ASSET | styleId: "' + asset.styleId + '"')
			else style.assets.push(asset)
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
					name: 'dummy-image.jpg',
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

		// console.warn('INIT_PROGRESS', state.progressItems)
		state.progressPct = 0
	},
	/*
	 *	Activate content block, opens window with matching contentComponent
	 *
	 */
	[OPEN_CONTENT.mutation](state, params) {
		console.warn('OPEN_CONTENT', params)

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
			state.content.list.unshift(content)

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
		console.warn('TOPMOST_WINDOW', windowId)
		let wll = state.windowList.length

		//console.log("zIndexes after",state.zIndexes)

		let matchingWindow = state.windowList.filter(
			e => e.windowId === windowId
		)[0]
		//console.log("current z", matchingWindow.positionZ )

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

	[TOGGLE_MUSIC_PLAYER.mutation](state) {
		state.musicPlayerOpen = !state.musicPlayerOpen
	},

	[MUSIC_PLAY_PAUSE.mutation](state, playing) {
		console.warn('MUSIC_PLAY_PAUSE', playing)
		state.musicPlaying = playing
	},

	[FORCE_STOP_MUSIC.mutation](state, playing) {
		console.warn('FORCE_STOP_MUSIC | pause music')
		state.musicPlaying = false
	},

	[CLIPBOARD_COPY.mutation](state, value) {
		console.warn('CLIPBOARD_COPY')
		state.clipBoardCopyComplete = value
	},

	[DOWNLOAD_PREPARING.mutation](state, value) {
		console.warn('DOWNLOAD_PREPARING')
		state.downloadPreparing = value
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
	[WALLPAPER_CHANGE.action]({ commit }) {
		commit(WALLPAPER_CHANGE.mutation)
	},
	[COOKIES_ACCEPT.action]({ commit }) {
		commit(COOKIES_ACCEPT.mutation)
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
				title: 'Style gallery',
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
	[TOGGLE_MUSIC_PLAYER.action]({ commit }, openState) {
		commit(TOGGLE_MUSIC_PLAYER.mutation, openState)
	},
	[MUSIC_PLAY_PAUSE.action]({ commit }, playing) {
		console.log('playing', playing)
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
		await commit(COLLECTION_ITEMS_FETCH.mutation, collection)

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
		await commit(COLLECTION_FILTERS_FETCH.mutation, filters)

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
		await commit(COLLECTION_ASSETS_FETCH.mutation, assets)

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
		await commit(FILMS_FETCH.mutation, films)

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
		await commit(GANNIGIRLS_FETCH.mutation, posts)

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
		await commit(LOOKBOOK_FETCH.mutation, lookBook)

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
		await commit(GENERAL_FETCH.mutation, general)

		await commit(CONNECT_ASSETS.mutation)
		await commit('collection/' + FILTER_COLLECTION.mutation)
		await commit(INIT_PROGRESS.mutation)
	}
}
