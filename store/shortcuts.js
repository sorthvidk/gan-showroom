import { SET_CURRENT_FILTER } from '~/model/constants'

import CollectionLayouts from '~/model/collection-layouts'
import ContentTypes from '~/model/content-types'
import ShortcutTypes from '~/model/shortcut-types'

export const state = () => ({
	blownUpIconLayout: true,
	list: [
		{
			type: ShortcutTypes.URL,
			shortcutId: 'rails',
			icon: '/img/shortcuts/rails.png',
			label: 'Rails (pdf)',
			posH: 2,
			posV: 3,
			href: '/files/GANNI_21-1_RAILS.pdf'
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'dittes-folder',
			icon: '/img/shortcuts/PRIVATE.png',
			label: 'Private',
			posH: 3,
			posV: 1,
			widthSpan: 2,
			windowContent: [
				{
					title: 'Ditte_inspiration_image_01',
					contentId: 'ditte-image1',
					type: ContentTypes.imageLandscapeLarge,
					canOverride: false,
					contentComponentProps: {
						asset: {
							defaultImageUrl: '/img/ditte/private1.jpg'
						}
					},
					statusComponentProps: {
						text: 'TIP! Hit ESC to close all'
					}
				},
				{
					title: 'Ditte_inspiration_image_02',
					contentId: 'ditte-image2',
					type: ContentTypes.imageLandscapeLarge,
					canOverride: false,
					contentComponentProps: {
						asset: {
							defaultImageUrl: '/img/ditte/private2.jpg'
						}
					},
					statusComponentProps: {
						text: 'TIP! Hit ESC to close all'
					}
				},
				{
					title: 'Ditte_inspiration_image_03',
					contentId: 'ditte-image3',
					type: ContentTypes.imageLandscapeLarge,
					canOverride: false,
					contentComponentProps: {
						asset: {
							defaultImageUrl: '/img/ditte/private3.jpg'
						}
					},
					statusComponentProps: {
						text: 'TIP! Hit ESC to close all'
					}
				},
				{
					title: 'Ditte_inspiration_image_04',
					contentId: 'ditte-image4',
					type: ContentTypes.imagePortraitLarge,
					canOverride: false,
					contentComponentProps: {
						asset: {
							defaultImageUrl: '/img/ditte/private4.jpg'
						}
					},
					statusComponentProps: {
						text: 'TIP! Hit ESC to close all'
					}
				},
				{
					title: 'Ditte_letter',
					contentId: 'ditte-letter',
					type: ContentTypes.textFile,
					canOverride: false,
					contentComponentProps: {
						text:
							'Dear friend,<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lectus quis sem lacinia nonummy. Proin mollis lorem non dolor. In hac habitasse platea dictumst. Nulla ultrices odio. Donec augue. Phasellus dui. Maecenas facilisis nisl vitae nibh. Proin vel seo est vitae eros pretium dignissim. Aliquam aliquam sodales orci. Suspendisse potenti. Nunc adipiscing euismod arcu. Quisque facilisis mattis lacus. Fusce bibendum, velit in venenatis viverra, tellus ligula dignissim felis, quis euismod mauris tellus ut urna. Proin scelerisque. Nulla in mi. Integer ac leo. Nunc urna ligula, gravida a, pretium vitae, bibendum nec, ante. Aliquam ullamcorper iaculis lectus. Sed vel dui. Etiam lacinia risus vitae lacus. Aliquam elementum imperdiet turpis. In id metus. Mauris eu nisl. Nam pharetra nisi nec enim. Nulla aliquam, tellus sed laoreet blandit, eros urna vehicula lectus, et vulputate mauris arcu ut arcu. Praesent eros metus lirum larum, accumsan a, malesuada et, commodo vel, nulla. Aliquam sagittis auctor sapien. Morbi a nibh.<br/><br/>Love from Ditte and the GANNI team!'
					}
				}
			]
		},		
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'look-book',
			icon: '/img/shortcuts/LOOKBOOK.png',
			label: 'LookBook',
			posH: 2,
			posV: 2,
			windowContent: [
				{
					title: 'GANNI LookBook',
					contentId: 'look-book',
					type: ContentTypes.lookBook,
					statusComponentProps: {
						text: 'Photo credit: Josefine Seifert'
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'collection-levis',
			icon: '/img/shortcuts/GANNIXLEVIS.png',
			label: "GANNI<br>x<br>Levi's",
			posH: 4,
			posV: 3,
			windowContent: [
				{
					title: "GANNI x Levi's",
					contentId: 'levis-collection',
					type: ContentTypes.collection,
					contentComponentProps: {
						layout: CollectionLayouts.FUN,
						collectionId: 'GANNIXLEVIS'
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'collection-ss21',
			icon: '/img/shortcuts/SS21.png',
			label: 'SS21 Collection',
			posH: 4,
			posV: 1,
			windowContent: [
				{
					title: 'SS21 Collection',
					contentId: 'ss21-collection',
					type: ContentTypes.collection,
					contentComponentProps: {
						// layout: CollectionLayouts.GRID,
						collectionId: 'SS21'
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'artists',
			icon: '/img/shortcuts/ARTISTS.png',
			label: '202020<br>Exhibition',
			posH: 6,
			posV: 2,
			windowContent: [
				{
					title: '202020 Exhibition',
					contentId: 'artists',
					type: ContentTypes.artists,
					statusComponentProps: {
						text: 'Check out the artists'
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'collection-software',
			icon: '/img/shortcuts/SOFTWARE.png',
			label: 'GANNI<br>Software',
			posH: 4,
			posV: 2,
			windowContent: [
				{
					title: 'GANNI Software',
					contentId: 'software-collection',
					type: ContentTypes.collection,
					contentComponentProps: {
						layout: CollectionLayouts.FUN,
						collectionId: 'SOFTWARE'
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'collage',
			label: 'COLLAGE<br>CLUB',
			icon: '/img/shortcuts/COLLAGECLUB.png',
			posH: 11,
			posV: 5,
			windowContent: [
				{
					title: 'COLLAGE CLUB',
					contentId: 'collage',
					type: ContentTypes.collage
				}
			]
		},

		// MARQUEE

		{
			type: ShortcutTypes.MARQUEE,
			text: 'Welcome to the GANNI Space! Check out ',
			label: 'the Elevated Lookbook',
			windowContent: [
				{
					title: 'GANNI LookBook',
					contentId: 'look-book',
					type: ContentTypes.lookBook,
					statusComponentProps: {
						text: 'Photo credit: Jakob Landvik'
					}
				}
			]
		},
		{
			type: ShortcutTypes.MARQUEE,
			text: 'Enjoy the GANNI ',
			label: '202020 Exhibition',
			windowContent: [
				{
					title: '202020 Exhibition',
					contentId: 'artists',
					type: ContentTypes.artists,
					statusComponentProps: {
						text: 'Check out the artists'
					}
				}
			]
		},
		{
			type: ShortcutTypes.MARQUEE,
			text: 'Check out ',
			label: 'the software collection',
			actions: [
				{
					name: 'collection/' + SET_CURRENT_FILTER.action,
					param: ''
				}
			],
			windowContent: [
				{
					title: 'GANNI Software',
					contentId: 'software-collection',
					type: ContentTypes.collection,
					canOverride: true,
					contentComponentProps: {
						layout: CollectionLayouts.FUN,
						collectionId: 'SOFTWARE'
					}
				}
			]
		},
		{
			type: ShortcutTypes.MARQUEE,
			text: 'Discover the ',
			label: 'GANNI REPEAT x LEVI’S LOVE LETTERS',
			href: 'https://repeat.ganni.com'
		},
		{
			type: ShortcutTypes.MARQUEE,
			text: 'Before you leave, check out our ',
			label: 'Responsibility report (pdf)',
			href: '/files/GANNI_RESPONSIBILITY_REPORT_19.pdf'
		}
		// {
		// 	type: ShortcutTypes.MARQUEE,
		// 	text: 'Meet the  ',
		// 	label: 'GANNI girls',
		// 	windowContent: [
		// 		{
		// 			title: '#GANNIGirls',
		// 			contentId: 'ganni-girls',
		// 			type: ContentTypes.ganniGirls,
		// 			statusComponentProps: {
		// 				text: 'http://#gannigirls.weblog/'
		// 			}
		// 		}
		// 	]
		// }
	]
})

export const mutations = {}

export const actions = {}
