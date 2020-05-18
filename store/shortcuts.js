import { SET_CURRENT_FILTER, TOGGLE_MUSIC_PLAYER } from '~/model/constants'

import ContentTypes from '~/model/content-types'

export const state = () => ({
	list: [
		{
			shortcutId: 'collection',
			icon: '📁',
			label: 'PS21 collection',
			posH: 1,
			posV: 1,
			action: 'collection/' + SET_CURRENT_FILTER.action,
			actionParam: '',
			windowContent: [
				{
					title: 'PS21 collection',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					canOverride: true
				}
			]
		},
		{
			shortcutId: 'films',
			icon: '📹',
			label: 'PS21 Films',
			posH: 2,
			posV: 1,
			windowContent: [
				{
					title: 'PS21 films 📹',
					contentId: 'ps21-films',
					type: ContentTypes.films,
					canOverride: true,
					statusComponentProps: {
						text: 'Films!! YAY!'
					}
				}
			]
		},
		{
			shortcutId: 'dittes-folder',
			icon: '🗂',
			label: 'Private ♥️',
			posH: 3,
			posV: 1,
			widthSpan: 2,
			action: null,
			actionParam: null,
			windowContent: [
				{
					title: 'Ditte image 1',
					contentId: 'ditte-image1',
					type: ContentTypes.imagePortrait,
					canOverride: false,
					contentComponentProps: {
						asset: {
							imageUrl: '/img/ditte/190808_GANNI_LANDVIK_SHOT_12_1260.jpg'
						}
					},
					windowProps: {
						width: 242,
						height: 402
					}
				},
				{
					title: 'Ditte image 2',
					contentId: 'ditte-image2',
					type: ContentTypes.imagePortrait,
					canOverride: false,
					contentComponentProps: {
						asset: {
							imageUrl: '/img/ditte/191101_Ganni_PF20_Jakob_04_0105_1.jpg'
						}
					},
					windowProps: {
						width: 262,
						height: 364
					}
				},
				{
					title: 'Ditte letter',
					contentId: 'ditte-letter',
					type: ContentTypes.textFile,
					canOverride: false,
					contentComponentProps: {
						text:
							'Dear friend,<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lectus quis sem lacinia nonummy. Proin mollis lorem non dolor. In hac habitasse platea dictumst. Nulla ultrices odio. Donec augue. Phasellus dui. Maecenas facilisis nisl vitae nibh. Proin vel seo est vitae eros pretium dignissim. Aliquam aliquam sodales orci. Suspendisse potenti. Nunc adipiscing euismod arcu. Quisque facilisis mattis lacus. Fusce bibendum, velit in venenatis viverra, tellus ligula dignissim felis, quis euismod mauris tellus ut urna. Proin scelerisque. Nulla in mi. Integer ac leo. Nunc urna ligula, gravida a, pretium vitae, bibendum nec, ante. Aliquam ullamcorper iaculis lectus. Sed vel dui. Etiam lacinia risus vitae lacus. Aliquam elementum imperdiet turpis. In id metus. Mauris eu nisl. Nam pharetra nisi nec enim. Nulla aliquam, tellus sed laoreet blandit, eros urna vehicula lectus, et vulputate mauris arcu ut arcu. Praesent eros metus lirum larum, accumsan a, malesuada et, commodo vel, nulla. Aliquam sagittis auctor sapien. Morbi a nibh.<br/><br/>Love from Ditte and the Ganni team!'
					}
				}
			]
		},
		{
			shortcutId: 'music-player',
			icon: '⚡️',
			label: 'Ganni FM',
			posH: 1,
			posV: 2,
			action: TOGGLE_MUSIC_PLAYER.action,
			windowContent: [
				{
					title: 'Ganni FM',
					contentId: 'ganni-fm',
					type: ContentTypes.musicPlayer,
					canOverride: true
				}
			]
		},
		{
			shortcutId: 'ganni-girls',
			icon: '👯‍♀️',
			label: 'Ganni Girls',
			posH: 2,
			posV: 2,
			windowContent: [
				{
					title: '#GanniGirls',
					contentId: 'ganni-girls',
					type: ContentTypes.ganniGirls,
					statusComponentProps: {
						text: 'http://#gannigirls.weblog/'
					}
				}
			]
		},
		{
			shortcutId: 'look-book',
			icon: '🤩',
			label: 'LookBook',
			posH: 3,
			posV: 2,
			windowContent: [
				{
					title: 'Ganni LookBook',
					contentId: 'look-book',
					type: ContentTypes.lookBook,
					statusComponentProps: {
						text: 'Photo credit: Jakob Landvik'
					}
				}
			]
		},
		{
			shortcutId: 'hampster-dance',
			icon: '🐹',
			label: 'Hampster Dance',
			posH: 12,
			posV: 4,
			windowContent: [
				{
					title: '🐹💃🐹💃 Hampster Dance! 💃🐹💃🐹',
					contentId: 'hampster-dance',
					type: ContentTypes.hampsterDance
				}
			]
		},
		{
			shortcutId: 'animal-print',
			icon: '🐯',
			label: 'Animal Print',
			posH: 12,
			posV: 5,
			action: 'collection/' + SET_CURRENT_FILTER.action,
			actionParam: 'LEOPARD PRINT',
			windowContent: [
				{
					title: 'PS21 collection 🔥',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					canOverride: true
				}
			]
		},
		{
			marqueeLink: true,
			label: 'Leopards',
			action: 'collection/' + SET_CURRENT_FILTER.action,
			actionParam: 'LEOPARD PRINT',
			windowContent: [
				{
					title: 'PS21 collection 🔥',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					canOverride: true
				}
			]
		},
		{
			marqueeLink: true,
			label: 'hampster',
			windowContent: [
				{
					title: '🐹💃🐹💃 Hampster Dance! 💃🐹💃🐹',
					contentId: 'hampster-dance',
					type: ContentTypes.hampsterDance
				}
			]
		},
		{
			marqueeLink: true,
			label: 'Style',
			actionParam: 'F8907234'
		}
	]
})

export const mutations = {}

export const actions = {}
