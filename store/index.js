import {	
	COLLECTION_ITEMS_FETCH,
	COLLECTION_FILTERS_FETCH,
	COLLECTION_ASSETS_FETCH,
	
	FILMS_FETCH,
	GANNIGIRLS_FETCH,
	LOOKBOOK_FETCH,

	CONNECT_ASSETS,
	FILTER_COLLECTION,
	INIT_PROGRESS,

	KEYPRESS,
	TOGGLE_MUSIC_PLAYER,
	MUSIC_PLAY_PAUSE,
	PLAY_VIDEO,
	
	TOPMOST_WINDOW,
	UPDATE_WINDOW,

	CLOSE_WINDOW,
	CLOSE_WINDOW_GROUP,

	OPEN_CONTENT,
	OPEN_GALLERY,
	OPEN_WISH_LIST,
	OPEN_STYLE_CONTENT

} from '~/model/constants'

import ContentTypes from '~/model/content-types'
import _ from 'lodash'

import getUniqueId from '~/utils/get-unique-id'
import getOptimalProp from '~/utils/get-optimal-props'
import getAssetType from '~/utils/asset-type'
import isMobile from '~/utils/is-mobile'

const WINDOW_CHROME_HEIGHT = 71
const WINDOW_CHROME_WIDTH = 2

export const state = () => ({
	hasData: false,

	progressItems: {},
	progressPct: 0,

	windowList: [],
	windowGroupList: [],
	topMostWindow: null,

	keyPressed: null,
	zIndexes: [],
	lowestZIndex: 0,
	highestZIndex: 0,

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
	]
})

export const mutations = {
	// Baseline content to cms

	[KEYPRESS.mutation](state, key) {
		state.keyPressed = key
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

	[CONNECT_ASSETS.mutation](state) {
		if (state.collection.assetsConnected) return false

		console.warn('CONNECT_ASSETS')

		let al = state.assets.list.length

		for (var i = 0; i < al; i++) {
			let asset = state.assets.list[i]
			let style = state.collection.list.filter(
				e => e.styleId === asset.styleId
			)[0]
			style.assets.push(asset)
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
					cloudinaryUrl: '/img/styles/dummy.jpg'
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

		Object.keys(ContentTypes).forEach((type)=> {
			state.progressItems[type] = false;
		});

		console.warn('INIT_PROGRESS',state.progressItems)
		state.progressPct = 0;
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

		params.windowContent.forEach(content => {
			const { contentId, canOverride } = content
			const contentType = content.type
			const contentName = content.title

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
			// placed here b/c they changes name of the key
			newWindow.contentName = contentName
			newWindow.contentType = contentType

			state.windowList.push(newWindow)
			state.content.list.push(content)

			windowGroup.windowIds.push(newWindow.windowId)
			windowGroup.contentIds.push(newWindow.contentId)
			windowGroup.groupSize++

			state.zIndexes.push(newWindow.positionZ)
			state.highestZIndex++

			state.topMostWindow = newWindow

			//FLAG PROGRESS!
			state.progressItems[contentType.name] = true;

		})

		//only add the group if it has content
		if (windowGroup.groupSize > 0 && !params.addToGroupId) state.windowGroupList.push(windowGroup)

		let pIC = 0
		let pIA = Object.entries(state.progressItems)
		let pIL = pIA.length
		for (let [key, value] of pIA) {
			if (value == true) pIC++
		}

		state.progressPct = Math.round((pIC / pIL) * 100)

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

		let windowsLength = state.windowList.length
		let newZIndexes = []

		for (var i = 0; i < windowsLength; i++) {
			let currentWindow = state.windowList[i]
			newZIndexes.push(currentWindow.positionZ)
		}
		//console.log("zIndexes before",state.zIndexes)
		newZIndexes.sort(function(a, b) {
			return a - b
		})
		state.zIndexes = newZIndexes
		//console.log("zIndexes after",state.zIndexes)

		let matchingWindow = state.windowList.filter(
			e => e.windowId === windowId
		)[0]
		//console.log("current z", matchingWindow.positionZ )

		if (matchingWindow) {
			state.highestZIndex = matchingWindow.positionZ
			matchingWindow.positionZ = state.zIndexes[windowsLength - 1] + 1

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

		let searchZ = currentWindow.positionZ
		if (searchZ == state.lowestZIndex) {
			//if closing window was lowest, set lowest current index to next lowest window
			state.lowestZIndex = state.zIndexes.shift()
		} else if (searchZ == state.highestZIndex) {
			//if closing window was highest, set highest current index to next highest window
			state.highestZIndex = state.zIndexes.pop()
		} else {
			//just remove index
			state.zIndexes.splice(state.zIndexes.indexOf(searchZ), 1)
		}

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

		if (state.windowGroupList.length == 0) {
			state.highestZIndex = 0
			state.lowestZIndex = 0
		}

		let wll = state.windowList.length
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
	[CLOSE_WINDOW_GROUP.mutation](state) {
		let groupsLength = state.windowGroupList.length

		if (groupsLength < 1) return false

		let windowGroup = state.windowGroupList[groupsLength - 1] //get latest group

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
			if (currentWindow) {
				let searchZ = currentWindow.positionZ
				//if closing window was lowest, set lowest current index to next lowest window
				if (searchZ == state.lowestZIndex) {
					//remove first element
					state.lowestZIndex = state.zIndexes.shift()
				}
				//if closing window was highest, set highest current index to next highest window
				else if (searchZ == state.highestZIndex) {
					state.highestZIndex = state.zIndexes.pop()
				} else {
					//just remove index
					state.zIndexes.splice(state.zIndexes.indexOf(searchZ), 1)
				}
			}
			state.windowList = state.windowList.filter(
				e => e.windowId !== ids.windowId
			)
		}

		state.windowGroupList.pop() //remove that group
		console.warn(
			'CLOSE_WINDOW_GROUP | remaining groups: ' + state.windowGroupList.length
		)

		if (state.windowGroupList.length == 0) {
			state.highestZIndex = 0
			state.lowestZIndex = 0
		}

		let wll = state.windowList.length
		state.topMostWindow = state.windowList[wll - 1]
	},

	[TOGGLE_MUSIC_PLAYER.mutation](state) {
		state.musicPlayerOpen = !state.musicPlayerOpen
	},

	[MUSIC_PLAY_PAUSE.mutation](state, playing) {
		console.warn('MUSIC_PLAY_PAUSE', playing)
		state.musicPlaying = playing
	},

	[PLAY_VIDEO.mutation](state, playing) {
		state.musicPlaying = false
	}
}

export const actions = {
	//first action, injects assets into collection
	[CONNECT_ASSETS.action]({ commit }) {
		commit(CONNECT_ASSETS.mutation)
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

		commit(OPEN_CONTENT.mutation, { windowContent: content })
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
				},
				windowProps: {
					positionZ: 4500,
					noStatus: true,
					isMaximized: true,
					canResize: false,
					modifierClass: 'window--gallery'
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
	[PLAY_VIDEO.action]({ commit }) {
		commit(PLAY_VIDEO.mutation)
	},

	[OPEN_WISH_LIST.action]({ commit }, asset) {
		let galleryContent = [
			{
				title: 'Your wishlist',
				contentId: 'wish-list',
				type: ContentTypes.wishList,
				canOverride: false,
				windowProps: {
					modifierClass: 'window--wish-list'
				}
			}
		]
		commit(OPEN_CONTENT.mutation, { windowContent: galleryContent })
	},

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





		await commit(CONNECT_ASSETS.mutation)
		await commit('collection/' + FILTER_COLLECTION.mutation)
		await commit(INIT_PROGRESS.mutation)

	}
}
