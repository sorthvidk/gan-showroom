import {
	FETCH_FILMS,
	FETCH_GANNIGIRLS,
	FETCH_LOOKBOOK,
	FETCH_GENERAL,
	FETCH_ANAS,
	FETCH_DITTE,
	FETCH_ABOUT,
	FETCH_INTRO,
	FETCH_DESKTOP,
	DESKTOP_BACKGROUND,
	FETCH_DOWNLOADS
} from '~/model/constants'

import ContentTypes from '~/model/content-types'
import AssistantModes from '~/model/assistant-modes'

export const state = () => ({
	films: [],
	ganniGirls: {},
	lookBook: [],

	anas: [],
	ditte: [],
	about: [],
	desktop: [],
	intro: [],
	downloads: [],

	desktopBackground: false, // int | false
	desktopBackgroundColor: '#349c5e' // string | false
})

export const mutations = {
	[FETCH_FILMS.mutation](state, data) {
		state.films = data
	},
	[FETCH_GANNIGIRLS.mutation](state, data) {
		state.ganniGirls.posts = data
	},
	[FETCH_LOOKBOOK.mutation](state, data) {
		state.lookBook = data
	},
	[FETCH_ANAS.mutation](state, data) {
		state.anas = data
	},
	[FETCH_DITTE.mutation](state, data) {
		const windowContent = data.map((item, i) => {
			return {
				title: item.title || 'Default title' + i,
				contentId: item.itemId,
				type:
					// todo: switch/case
					ContentTypes[
						item.type === 'video'
							? 'videoLandscape'
							: item.type === 'image'
							? 'imagePortraitLarge' // todo: multiple aspects/sizes
							: 'textFile'
					],
				contentComponentProps: {
					text: item.text,
					asset: {
						type: item.type,
						cloudinaryUrl: Array.isArray(item.cloudinaryUrl)
							? item.cloudinaryUrl[0]
							: item.cloudinaryUrl
					}
				},
				assistant: {
					mode: AssistantModes.CUSTOM,
					text: 'ditte'
				}
			}
		})

		// array of windowContent
		state.ditte = windowContent
	},
	[FETCH_ABOUT.mutation](state, data) {
		const windowContent = data.map((item, i) => {
			return {
				title: item.title || 'Default title' + i,
				contentId: item.itemId,
				type:
					// todo: switch/case
					ContentTypes[
						item.type === 'video'
							? 'videoLandscape'
							: item.type === 'image'
							? 'imagePortraitLarge' // todo: only supports one size
							: 'textFile'
					],
				contentComponentProps: {
					text: item.text,
					asset: {
						type: item.type,
						cloudinaryUrl: Array.isArray(item.cloudinaryUrl)
							? item.cloudinaryUrl[0]
							: item.cloudinaryUrl
					}
				},
				assistant: {
					mode: AssistantModes.CUSTOM,
					text: 'about'
				}
			}
		})

		// array of windowContent
		state.about = windowContent
	},

	[FETCH_GENERAL.mutation](state, { data, rootState }) {
		/**
		 * is this is use?
		 */
		//Insert Ganni Girls bg image
		let misc = data.filter(e => e.slug === 'misc')[0]
		state.ganniGirls.bgImageUrl = misc.ganniGirlsUrl
	},

	[FETCH_DESKTOP.mutation](state, data) {
		const colors = [
			'#0f5f9a',
			'#fae199',
			'#349c5e',
			'#d8aab7',
			'#93b7d5',
			'#de5b8c'
		]

		state.desktop = data.map((item, i) => ({
			color: colors[i % colors.length],
			image: Array.isArray(item.cloudinaryUrl)
				? item.cloudinaryUrl[0]
				: item.cloudinaryUrl
		}))
	},

	[FETCH_INTRO.mutation](state, data) {
		state.intro = data.map(({ type, column, cloudinaryUrl }) => ({
			type,
			column,
			cloudinaryUrl
		}))
	},

	[DESKTOP_BACKGROUND.mutation](state, data) {
		state.desktopBackground = data
		state.desktopBackgroundColor =
			data !== false ? state.desktop[data].color : state.desktopBackgroundColor
	},

	[FETCH_DOWNLOADS.mutation](state, data) {
		state.downloads = data
	}
}

export const actions = {
	[DESKTOP_BACKGROUND.action]({ commit }, data) {
		commit(DESKTOP_BACKGROUND.mutation, data)
	}
}
