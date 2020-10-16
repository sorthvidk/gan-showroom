import {
	FILMS_FETCH,
	GANNIGIRLS_FETCH,
	LOOKBOOK_FETCH,
	GENERAL_FETCH,
	ANNAS_FETCH,
	DITTE_FETCH
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

	annas: [],
	ditte: []
})

export const mutations = {
	[FILMS_FETCH.mutation](state, data) {
		state.films = data
	},
	[GANNIGIRLS_FETCH.mutation](state, data) {
		state.ganniGirls.posts = data
	},
	[LOOKBOOK_FETCH.mutation](state, data) {
		state.lookBook = data
	},
	[ANNAS_FETCH.mutation](state, data) {
		state.annas = data
	},
	[DITTE_FETCH.mutation](state, data) {
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

		// {
		// 	title: 'Ditte_inspiration_image_03',
		// 	contentId: 'ditte-image3',
		// 	type: ContentTypes.imagePortraitLarge,
		// 	contentComponentProps: {
		// 		asset: {
		// 			defaultImageUrl: '/img/ditte/ditte3.jpg'
		// 		}
		// 	},
		// 	assistant: {
		// 		mode: AssistantModes.CUSTOM,
		// 		text: 'ditte'
		// 	}
		// },

		// {
		// 	title: 'Ditte_letter',
		// 	contentId: 'ditte-letter',
		// 	type: ContentTypes.textFile,
		// 	contentComponentProps: {
		// 		text:
		// 			'Dear friend,<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lectus quis sem lacinia nonummy. Proin mollis lorem non dolor. In hac habitasse platea dictumst. Nulla ultrices odio. Donec augue. Phasellus dui. Maecenas facilisis nisl vitae nibh. Proin vel seo est vitae eros pretium dignissim. Aliquam aliquam sodales orci. Suspendisse potenti. Nunc adipiscing euismod arcu. Quisque facilisis mattis lacus. Fusce bibendum, velit in venenatis viverra, tellus ligula dignissim felis, quis euismod mauris tellus ut urna. Proin scelerisque. Nulla in mi. Integer ac leo. Nunc urna ligula, gravida a, pretium vitae, bibendum nec, ante. Aliquam ullamcorper iaculis lectus. Sed vel dui. Etiam lacinia risus vitae lacus. Aliquam elementum imperdiet turpis. In id metus. Mauris eu nisl. Nam pharetra nisi nec enim. Nulla aliquam, tellus sed laoreet blandit, eros urna vehicula lectus, et vulputate mauris arcu ut arcu. Praesent eros metus lirum larum, accumsan a, malesuada et, commodo vel, nulla. Aliquam sagittis auctor sapien. Morbi a nibh.<br/><br/>Love from Ditte and the GANNI team!'
		// 	},
		// 	assistant: {
		// 		mode: AssistantModes.CUSTOM,
		// 		text: 'ditte'
		// 	}
		// },

		// {
		// 	title: 'Ditte_inspiration_image_02',
		// 	contentId: 'ditte-image2',
		// 	type: ContentTypes.imageLandscapeLarge,
		// 	contentComponentProps: {
		// 		asset: {
		// 			defaultImageUrl: '/img/ditte/ditte2.jpg'
		// 		}
		// 	},
		// 	assistant: {
		// 		mode: AssistantModes.CUSTOM,
		// 		text: 'ditte'
		// 	}
		// },
		// {
		// 	title: 'Ditte_inspiration_image_03',
		// 	contentId: 'ditte-image3',
		// 	type: ContentTypes.imagePortraitLarge,
		// 	contentComponentProps: {
		// 		asset: {
		// 			defaultImageUrl: '/img/ditte/ditte3.jpg'
		// 		}
		// 	},
		// 	assistant: {
		// 		mode: AssistantModes.CUSTOM,
		// 		text: 'ditte'
		// 	}
		// },
		// {
		// 	title: 'Ditte_inspiration_image_04',
		// 	contentId: 'ditte-image4',
		// 	type: ContentTypes.imagePortraitLarge,
		// 	contentComponentProps: {
		// 		asset: {
		// 			defaultImageUrl: '/img/ditte/ditte4.jpg'
		// 		}
		// 	},
		// 	assistant: {
		// 		mode: AssistantModes.CUSTOM,
		// 		text: 'ditte'
		// 	}
		// },
		// {
		// 	title: 'Ditte_inspiration_image_05',
		// 	contentId: 'ditte-image5',
		// 	type: ContentTypes.imagePortraitLarge,
		// 	contentComponentProps: {
		// 		asset: {
		// 			defaultImageUrl: '/img/ditte/ditte5.jpg'
		// 		}
		// 	},
		// 	assistant: {
		// 		mode: AssistantModes.CUSTOM,
		// 		text: 'ditte'
		// 	}
		// },
		// {
		// 	title: 'Ditte_inspiration_image_06',
		// 	contentId: 'ditte-image6',
		// 	type: ContentTypes.imagePortraitLarge,
		// 	contentComponentProps: {
		// 		asset: {
		// 			defaultImageUrl: '/img/ditte/ditte6.jpg'
		// 		}
		// 	},
		// 	assistant: {
		// 		mode: AssistantModes.CUSTOM,
		// 		text: 'ditte'
		// 	}
		// },
		// {
		// 	title: 'Ditte_letter',
		// 	contentId: 'ditte-letter',
		// 	type: ContentTypes.textFile,
		// 	contentComponentProps: {
		// 		text:
		// 			'Dear friend,<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lectus quis sem lacinia nonummy. Proin mollis lorem non dolor. In hac habitasse platea dictumst. Nulla ultrices odio. Donec augue. Phasellus dui. Maecenas facilisis nisl vitae nibh. Proin vel seo est vitae eros pretium dignissim. Aliquam aliquam sodales orci. Suspendisse potenti. Nunc adipiscing euismod arcu. Quisque facilisis mattis lacus. Fusce bibendum, velit in venenatis viverra, tellus ligula dignissim felis, quis euismod mauris tellus ut urna. Proin scelerisque. Nulla in mi. Integer ac leo. Nunc urna ligula, gravida a, pretium vitae, bibendum nec, ante. Aliquam ullamcorper iaculis lectus. Sed vel dui. Etiam lacinia risus vitae lacus. Aliquam elementum imperdiet turpis. In id metus. Mauris eu nisl. Nam pharetra nisi nec enim. Nulla aliquam, tellus sed laoreet blandit, eros urna vehicula lectus, et vulputate mauris arcu ut arcu. Praesent eros metus lirum larum, accumsan a, malesuada et, commodo vel, nulla. Aliquam sagittis auctor sapien. Morbi a nibh.<br/><br/>Love from Ditte and the GANNI team!'
		// 	},
		// 	assistant: {
		// 		mode: AssistantModes.CUSTOM,
		// 		text: 'ditte'
		// 	}
		// },
		// {
		// 	title: 'Ditte_inspiration_image_07',
		// 	contentId: 'ditte-image7',
		// 	type: ContentTypes.imagePortraitLarge,
		// 	contentComponentProps: {
		// 		asset: {
		// 			defaultImageUrl: '/img/ditte/ditte8.jpg'
		// 		}
		// 	},
		// 	assistant: {
		// 		mode: AssistantModes.CUSTOM,
		// 		text: 'ditte'
		// 	}
		// }
		// ]

		// array of windowContent
		state.ditte = windowContent
	},
	[GENERAL_FETCH.mutation](state, { data, rootState }) {
		//Insert Ganni Girls bg image
		let misc = data.filter(e => e.slug === 'misc')[0]
		state.ganniGirls.bgImageUrl = misc.ganniGirlsUrl

		//Insert Ditte's letter

		// let dittesFolder = rootState.shortcuts.list.filter(
		// 	e => e.shortcutId === 'dittes-folder'
		// )[0]

		// if (!dittesFolder) return false
		// let content = dittesFolder.windowContent.filter(
		// 	f => f.contentId === 'ditte-letter'
		// )

		// if (!content) return false
		// let props = content[0].contentComponentProps

		// if (!props.text) return false
		// props.text = misc.ditteLetter
	}
}

export const actions = {
	// [OPEN_ASSETS_WINDOWS.action]({ commit }, data) {
	// 	commit([OPEN_ASSETS_WINDOWS.mutation], data)
	// }
}
