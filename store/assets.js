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
	DESKTOP_BACKGROUND
} from '~/model/constants'

import ContentTypes from '~/model/content-types'
import AssistantModes from '~/model/assistant-modes'

export const state = () => ({
	films: [
		{
			filmId: '123456',
			filmName: 'Numa numa',
			posterUrl: '/img/styles/F4478-687-square.png',
			cloudinaryUrl:
				'https://res.cloudinary.com/ganni-a-s/video/upload/vc_h264/v1589202709/animation2_pnfv4v.mp4'
		},
		{
			filmId: '123457',
			filmName: 'Numa numa',
			posterUrl: '/img/styles/F4478-687-square.png',
			cloudinaryUrl:
				'https://res.cloudinary.com/ganni-a-s/video/upload/vc_h264/v1589202709/animation2_pnfv4v.mp4'
		},
		{
			filmId: '123458',
			filmName: 'Numa numa',
			posterUrl: '/img/styles/F4478-687-square.png',
			cloudinaryUrl:
				'https://res.cloudinary.com/ganni-a-s/video/upload/vc_h264/v1589202709/animation2_pnfv4v.mp4'
		}
	],

	ganniGirls: {
		bgImageUrl: '/img/LOOK_12.jpg',
		posts: [
			{
				postId: '34902834',
				thumbnailUrl: '/img/styles/F4478-687-square.png',
				cloudinaryUrl: '/img/LOOK_16.jpg',
				type: 'image',
				posterHandle: '@chloechill',
				postedDate: '12 may 2020',
				title: 'Lorem ipsum',
				bodyText:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam molestias sit, eligendi corrupti similique voluptas! Facere deserunt harum quaerat nisi recusandae deleniti hic atque unde, magnam exercitationem sunt earum. Repellat.'
			},
			{
				postId: '349028342',
				thumbnailUrl: '/img/styles/F4478-687-square.png',
				cloudinaryUrl:
					'https://res.cloudinary.com/ganni-a-s/video/upload/vc_h264/v1589202709/animation2_pnfv4v.mp4',
				type: 'video',
				posterHandle: '@babyb3ns',
				postedDate: '11 may 2020',
				title: 'Lorem ipsum',
				bodyText:
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam molestias sit, eligendi corrupti similique voluptas! Facere deserunt harum quaerat nisi recusandae deleniti hic atque unde, magnam exercitationem sunt earum. Repellat.'
			}
		]
	},

	lookBook: [
		{
			cloudinaryUrl:
				'/img/lookbook/00001-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00002-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00003-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00004-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00005-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00006-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00007-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00008-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00009-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00010-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00011-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00012-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00013-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00014-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00015-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00016-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00017-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00018-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00019-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00020-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00021-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00022-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00023-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00024-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00025-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		},
		{
			cloudinaryUrl:
				'/img/lookbook/00026-Ganni-Pre-Fall-20-Credit-Jakoblandvik.jpg'
		}
	],

	anas: [],
	ditte: [],
	about: [],
	desktop: [],
	intro: [],

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
						cloudinaryUrl: item.cloudinaryUrl
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
						cloudinaryUrl: item.cloudinaryUrl
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
			image: item.cloudinaryUrl
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
	}
}

export const actions = {
	[DESKTOP_BACKGROUND.action]({ commit }, data) {
		commit(DESKTOP_BACKGROUND.mutation, data)
	}
}
