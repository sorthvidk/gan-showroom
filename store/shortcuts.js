import { SET_CURRENT_FILTER, COLLECTION_LAYOUT_CHANGE } from '~/model/constants'

import CollectionLayouts from '~/model/collection-layouts'
import ContentTypes from '~/model/content-types'
import ShortcutTypes from '~/model/shortcut-types'

export const state = () => ({
	blownUpIconLayout: true,
	list: [
		// {
		// 	type: ShortcutTypes.WINDOW,
		// 	shortcutId: 'archive',
		// 	icon: '/img/collage/dress1.png',
		// 	label: 'Archive',
		// 	posH: 1,
		// 	posV: 4,
		// 	actions: [
		// 		{
		// 			name: COLLECTION_LAYOUT_CHANGE.action,
		// 			param: CollectionLayouts.GRID
		// 		}
		// 	],
		// 	windowContent: [
		// 		{
		// 			title: 'Archive',
		// 			contentId: 'archive-id',
		// 			type: ContentTypes.archive,
		// 			contentComponentProps: {
		// 				shortcuts: ['collection', 'collection-test']
		// 			}
		// 		}
		// 	]
		// },
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'collection-ps21',
			// icon: '/img/shortcuts/ps21.png',
			icon: '/img/collage/dress2.png',
			label: 'PS21 collection',
			posH: 1,
			posV: 1,
			actions: [
				{
					name: COLLECTION_LAYOUT_CHANGE.action,
					param: CollectionLayouts.GRID
				}
			],
			windowContent: [
				{
					title: 'PS21 collection',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					contentComponentProps: {
						collectionId: 'PS21'
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'collection-ss21',
			// icon: '/img/shortcuts/ps21.png',
			icon: '/img/collage/dress3.png',
			label: 'SS21 Collection',
			posH: 4,
			posV: 1,
			actions: [
				{
					name: COLLECTION_LAYOUT_CHANGE.action,
					param: CollectionLayouts.GRID
				}
			],
			windowContent: [
				{
					title: 'SS21 Collection',
					contentId: 'ss21-collection',
					type: ContentTypes.collection,
					contentComponentProps: {
						collectionId: 'SS21'
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'collection-software',
			// icon: '/img/shortcuts/ps21.png',
			icon: '/img/collage/dress3.png',
			label: 'GANNI Software',
			posH: 4,
			posV: 2,
			actions: [
				{
					name: COLLECTION_LAYOUT_CHANGE.action,
					param: CollectionLayouts.FUN
				}
			],
			windowContent: [
				{
					title: 'GANNI Software',
					contentId: 'software-collection',
					type: ContentTypes.collection,
					contentComponentProps: {
						collectionId: 'SOFTWARE'
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'collection-levis',
			// icon: '/img/shortcuts/ps21.png',
			icon: '/img/collage/dress3.png',
			label: "GANNI x Levi's",
			posH: 4,
			posV: 3,
			actions: [
				{
					name: COLLECTION_LAYOUT_CHANGE.action,
					param: CollectionLayouts.FUN
				}
			],
			windowContent: [
				{
					title: "GANNI x Levi's",
					contentId: 'levis-collection',
					type: ContentTypes.collection,
					contentComponentProps: {
						collectionId: 'GANNIXLEVIS'
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'films',
			// icon: '/img/shortcuts/films.png',
			icon: '/img/collage/dress4.png',
			label: 'SS21 Films',
			posH: 2,
			posV: 1,
			windowContent: [
				{
					title: 'SS21 films',
					contentId: 'ss21-films',
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
			// icon: '/img/shortcuts/dittes_private.png',
			icon: '/img/collage/dress5.png',
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
							defaultImageUrl: '/img/ditte/ditte1.jpg'
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
							defaultImageUrl: '/img/ditte/ditte2.jpg'
						}
					},
					statusComponentProps: {
						text: 'TIP! Hit ESC to close all'
					}
				},
				{
					title: 'Ditte_inspiration_image_03',
					contentId: 'ditte-image3',
					type: ContentTypes.imagePortraitLarge,
					canOverride: false,
					contentComponentProps: {
						asset: {
							defaultImageUrl: '/img/ditte/ditte3.jpg'
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
							defaultImageUrl: '/img/ditte/ditte4.jpg'
						}
					},
					statusComponentProps: {
						text: 'TIP! Hit ESC to close all'
					}
				},
				{
					title: 'Ditte_inspiration_image_05',
					contentId: 'ditte-image5',
					type: ContentTypes.imagePortraitLarge,
					canOverride: false,
					contentComponentProps: {
						asset: {
							defaultImageUrl: '/img/ditte/ditte5.jpg'
						}
					},
					statusComponentProps: {
						text: 'TIP! Hit ESC to close all'
					}
				},
				{
					title: 'Ditte_inspiration_image_06',
					contentId: 'ditte-image6',
					type: ContentTypes.imagePortraitLarge,
					canOverride: false,
					contentComponentProps: {
						asset: {
							defaultImageUrl: '/img/ditte/ditte6.jpg'
						}
					},
					statusComponentProps: {
						text: 'TIP! Hit ESC to close all'
					}
				},
				// {
				// 	title: 'Ditte_inspiration_image_07',
				// 	contentId: 'ditte-image7',
				// 	type: ContentTypes.imagePortraitLarge,
				// 	canOverride: false,
				// 	contentComponentProps: {
				// 		asset: {
				// 			defaultImageUrl: '/img/ditte/ditte7.jpg'
				// 		}
				// 	},
				// 	statusComponentProps: {
				// 		text: 'TIP! Hit ESC to close all'
				// 	}
				// },
				{
					title: 'Ditte_inspiration_image_07',
					contentId: 'ditte-image7',
					type: ContentTypes.imagePortraitLarge,
					canOverride: false,
					contentComponentProps: {
						asset: {
							defaultImageUrl: '/img/ditte/ditte8.jpg'
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
			shortcutId: 'music-player',
			// icon: '/img/shortcuts/ganni_fm.png',
			icon: '/img/collage/dress6.png',
			label: 'GANNI FM',
			posH: 1,
			posV: 2,
			windowContent: [
				{
					title: 'GANNI FM',
					contentId: 'ganni-fm',
					type: ContentTypes.musicPlayer,
					canOverride: true
				}
			]
		},
		// {
		// 	type: ShortcutTypes.WINDOW,
		// 	shortcutId: 'ganni-girls',
		// 	icon: '/img/shortcuts/ganni_girls.png',
		// 	label: 'GANNI Girls',
		// 	posH: 2,
		// 	posV: 2,
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
		// },
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'look-book',
			// icon: '/img/shortcuts/look_book.png',
			icon: '/img/collage/dress7.png',
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
			shortcutId: 'artists',
			// icon: '/img/shortcuts/look_book.png',
			icon: '/img/collage/dress1.png',
			label: '202020 Exhibition',
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
			shortcutId: 'animal-print',
			// icon: '/img/shortcuts/animal_print.png',
			icon: '/img/collage/shirt1.png',
			label: 'Animal Print',
			posH: 10,
			posV: 6,
			actions: [
				{
					name: 'collection/' + SET_CURRENT_FILTER.action,
					param: 'misc4'
				},
				{
					name: COLLECTION_LAYOUT_CHANGE.action,
					param: CollectionLayouts.FUN
				}
			],
			windowContent: [
				{
					title: 'PS21 collection',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					contentComponentProps: {
						collectionId: 'PS21'
					}
				}
			]
		},
		// {
		// 	type: ShortcutTypes.WINDOW,
		// 	shortcutId: 'ganni-software',
		// 	icon: '/img/shortcuts/ganni_software.png',
		// 	label: 'GANNI Software',
		// 	posH: 11,
		// 	posV: 6,
		// 	actions: [
		// 		{
		// 			name: 'collection/' + SET_CURRENT_FILTER.action,
		// 			param: 'misc5'
		// 		},
		// 		{
		// 			name: COLLECTION_LAYOUT_CHANGE.action,
		// 			param: CollectionLayouts.FUN
		// 		}
		// 	],
		// 	windowContent: [
		// 		{
		// 			title: 'PS21 collection',
		// 			contentId: 'ps21-collection',
		// 			type: ContentTypes.collection,
		// 			canOverride: true
		// 		}
		// 	]
		// },
		// {
		// 	type: ShortcutTypes.WINDOW,
		// 	shortcutId: 'accessories',
		// 	icon: '/img/shortcuts/acces.png',
		// 	label: 'Acces',
		// 	posH: 12,
		// 	posV: 6,
		// 	actions: [
		// 		{
		// 			name: 'collection/' + SET_CURRENT_FILTER.action,
		// 			param: 'acc1'
		// 		},
		// 		{
		// 			name: COLLECTION_LAYOUT_CHANGE.action,
		// 			param: CollectionLayouts.FUN
		// 		}
		// 	],
		// 	windowContent: [
		// 		{
		// 			title: 'PS21 collection',
		// 			contentId: 'ps21-collection',
		// 			type: ContentTypes.collection,
		// 			canOverride: true
		// 		}
		// 	]
		// },
		{
			type: ShortcutTypes.URL,
			shortcutId: 'responsibility-report',
			icon: '/img/collage/shirt2.png',
			label: 'Responsibility (pdf)',
			posH: 1,
			posV: 3,
			href: '/files/GANNI_RESPONSIBILITY_REPORT_19.pdf'
		},

		{
			type: ShortcutTypes.URL,
			shortcutId: 'rails',
			icon: '/img/collage/shirt3.png',
			label: 'Rails (pdf)',
			posH: 2,
			posV: 3,
			href: '/files/GANNI_PS21_Rails.pdf'
		},
		// {
		// 	type: ShortcutTypes.WINDOW,
		// 	shortcutId: 'hampster-dance',
		// 	icon: '/img/shortcuts/hamster_dance.png',
		// 	label: 'Hampster Dance',
		// 	posH: 12,
		// 	posV: 5,
		// 	windowContent: [
		// 		{
		// 			title: 'Hampster Dance',
		// 			contentId: 'hampster-dance',
		// 			type: ContentTypes.hampsterDance
		// 		}
		// 	]
		// },

		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'collage',
			label: 'COLLAGE CLUB',
			icon: '/img/collage/pants.png',
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
		},{
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
				},
				{
					name: COLLECTION_LAYOUT_CHANGE.action,
					param: CollectionLayouts.FUN
				}
			],
			windowContent: [
				{
					title: 'GANNI Software',
					contentId: 'software-collection',
					type: ContentTypes.collection,
					canOverride: true,
					contentComponentProps: {
						collectionId: 'SOFTWARE'
					}
				}
			]
		},
		{
			type: ShortcutTypes.MARQUEE,
			text: 'Before you leave, check out our ',
			label: 'Responsibility report (pdf)',
			href: '/files/GANNI_RESPONSIBILITY_REPORT_19.pdf'
		},
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
