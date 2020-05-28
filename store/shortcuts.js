import { SET_CURRENT_FILTER, TOGGLE_MUSIC_PLAYER } from '~/model/constants'

import ContentTypes from '~/model/content-types'
import ShortcutTypes from '~/model/shortcut-types'

export const state = () => ({
	list: [
		{
			type: ShortcutTypes.WINDOW,
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

			type: ShortcutTypes.WINDOW,
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

			type: ShortcutTypes.WINDOW,
			shortcutId: 'dittes-folder',
			icon: '🗂',
			label: 'Private ♥️',
			posH: 4,
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
							defaultImageUrl:
								'/img/ditte/190808_GANNI_LANDVIK_SHOT_12_1260.jpg'
						}
					},
					windowProps: {
						width: 242,
						height: 459,
						noStatus: true
					}
				},
				{
					title: 'Ditte image 2',
					contentId: 'ditte-image2',
					type: ContentTypes.imagePortrait,
					canOverride: false,
					contentComponentProps: {
						asset: {
							defaultImageUrl:
								'/img/ditte/191101_Ganni_PF20_Jakob_04_0105_1.jpg'
						}
					},
					windowProps: {
						width: 262,
						height: 424,
						noStatus: true
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

			type: ShortcutTypes.WINDOW,
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

			type: ShortcutTypes.WINDOW,
			shortcutId: 'ganni-girls',
			icon: '👯‍♀️',
			label: 'Ganni Girls',
			posH: 1,
			posV: 5,
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

			type: ShortcutTypes.WINDOW,
			shortcutId: 'look-book',
			icon: '🤩',
			label: 'LookBook',
			posH: 2,
			posV: 5,
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

			type: ShortcutTypes.WINDOW,
			shortcutId: 'hampster-dance',
			icon: '🐹',
			label: 'Hampster Dance',
			posH: 12,
			posV: 6,
			windowContent: [
				{
					title: '🐹💃🐹💃 Hampster Dance! 💃🐹💃🐹',
					contentId: 'hampster-dance',
					type: ContentTypes.hampsterDance
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'animal-print',
			icon: '🐯',
			label: 'Animal Print',
			posH: 12,
			posV: 7,
			action: 'collection/' + SET_CURRENT_FILTER.action,
			actionParam: 'misc4',
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
			type: ShortcutTypes.WINDOW,
			shortcutId: 'jersey-shore',
			icon: '🇯🇪',
			label: 'Jersey Shore',
			posH: 11,
			posV: 7,
			action: 'collection/' + SET_CURRENT_FILTER.action,
			actionParam: 'misc5',
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

			type: ShortcutTypes.URL,
			shortcutId: 'responsibility-report',
			icon: '📄',
			label: 'Responsibility (pdf)',
			posH: 1,
			posV: 7,
			href: '/files/ganni-responsibility.pdf'			
		},
		{
			type: ShortcutTypes.MARQUEE,
			text: 'Take a look at this ',
			label: 'Leopards!',
			action: 'collection/' + SET_CURRENT_FILTER.action,
			actionParam: 'misc4',
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
			type: ShortcutTypes.MARQUEE,
			text: 'Or this ',
			label: 'hampster dance',
			windowContent: [
				{
					title: '🐹💃🐹💃 Hampster Dance! 💃🐹💃🐹',
					contentId: 'hampster-dance',
					type: ContentTypes.hampsterDance
				}
			]
		},
		{
			type: ShortcutTypes.MARQUEE,
			text: 'Also this ',
			label: `cool dress`,
			actionParam: 'F8907234'
		}
	]
})

export const mutations = {}

export const actions = {}
