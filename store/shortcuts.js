import {
	SET_CURRENT_FILTER,
	SET_GROUP_BY_IDENTIFIER,
	SET_GROUP_BY_INDEX,
	TOGGLE_MUSIC_PLAYER,
	COLLECTION_LAYOUT_CHANGE
} from '~/model/constants'

import CollectionLayouts from '~/model/collection-layouts'
import ContentTypes from '~/model/content-types'
import ShortcutTypes from '~/model/shortcut-types'

export const state = () => ({
	list: [
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'collection',
			icon: '/img/shortcuts/ps21.png',
			label: 'PS21 collection',
			posH: 1,
			posV: 1,
			actions: [
				{ name: 'collection/' + SET_CURRENT_FILTER.action, param: '' },
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
					canOverride: true
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'films',
			icon: '/img/shortcuts/films.png',
			label: 'PS21 Films',
			posH: 2,
			posV: 1,
			windowContent: [
				{
					title: 'PS21 films',
					contentId: 'ps21-films',
					type: ContentTypes.films,
					canOverride: true,
					statusComponentProps: {
						text: 'Films!! YAY!'
					},
					customAssistantText: {
						headline: 'FILMS',
						bodyText: 'See all the awesome films<br><br><br>BRUH!'
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'dittes-folder',
			icon: '/img/shortcuts/dittes_private.png',
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
					},
					customAssistantText: {
						headline: 'WELCOME!',
						bodyText: "Hey! I'm DITTE! Look at all my stuff!"
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
					},
					customAssistantText: {
						headline: 'WELCOME!',
						bodyText: "Hey! I'm DITTE! Look at all my stuff!"
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
					},
					customAssistantText: {
						headline: 'WELCOME!',
						bodyText: "Hey! I'm DITTE! Look at all my stuff!"
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
					},
					customAssistantText: {
						headline: 'WELCOME!',
						bodyText: "Hey! I'm DITTE! Look at all my stuff!"
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
					},
					customAssistantText: {
						headline: 'WELCOME!',
						bodyText: "Hey! I'm DITTE! Look at all my stuff!"
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
					},
					customAssistantText: {
						headline: 'WELCOME!',
						bodyText: "Hey! I'm DITTE! Look at all my stuff!"
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
					},
					customAssistantText: {
						headline: 'WELCOME!',
						bodyText: "Hey! I'm DITTE! Look at all my stuff!"
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
					},
					customAssistantText: {
						headline: 'WELCOME!',
						bodyText: "Hey! I'm DITTE! Look at all my stuff!"
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'music-player',
			icon: '/img/shortcuts/ganni_fm.png',
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
			icon: '/img/shortcuts/look_book.png',
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
			shortcutId: 'animal-print',
			icon: '/img/shortcuts/animal_print.png',
			label: 'Animal Print',
			posH: 10,
			posV: 6,
			actions: [
				{
					name: 'collection/' + SET_GROUP_BY_IDENTIFIER.action,
					param: 'cotton-fun'
				},
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
					canOverride: true
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'ganni-software',
			icon: '/img/shortcuts/ganni_software.png',
			label: 'Drop 2 Feb!?',
			posH: 11,
			posV: 6,
			actions: [
				{
					name: 'collection/' + SET_GROUP_BY_IDENTIFIER.action,
					param: 'drop2-feb'
				},
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
					canOverride: true
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'accessories',
			icon: '/img/shortcuts/acces.png',
			label: 'Jerseys',
			posH: 12,
			posV: 6,
			actions: [
				{
					name: 'collection/' + SET_GROUP_BY_INDEX.action,
					param: -1
				},
				{
					name: 'collection/' + SET_CURRENT_FILTER.action,
					param: 'rtw4'
				},
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
					canOverride: true
				}
			]
		},
		{
			type: ShortcutTypes.URL,
			shortcutId: 'responsibility-report',
			icon: '/img/shortcuts/responsible.png',
			label: 'Responsibility (pdf)',
			posH: 1,
			posV: 3,
			href: '/files/GANNI_RESPONSIBILITY_REPORT_19.pdf'
		},

		{
			type: ShortcutTypes.URL,
			shortcutId: 'rails',
			icon: '/img/shortcuts/rails.png',
			label: 'Rails (pdf)',
			posH: 2,
			posV: 3,
			href: '/files/GANNI_PS21_Rails.pdf'
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'hampster-dance',
			icon: '/img/shortcuts/hamster_dance.png',
			label: 'Hampster Dance',
			posH: 12,
			posV: 5,
			windowContent: [
				{
					title: 'Hampster Dance',
					contentId: 'hampster-dance',
					type: ContentTypes.hampsterDance
				}
			]
		},

		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'collage',
			label: 'PLAY DRESS UP',
			icon: '/img/shortcuts/ganni_dressup.png',
			posH: 11,
			posV: 5,
			windowContent: [
				{
					title: 'PLAY DRESS UP',
					contentId: 'collage',
					type: ContentTypes.collage
				}
			]
		},

		{
			type: ShortcutTypes.MARQUEE,
			text: 'Welcome to the GANNI Space! Check out the ',
			label: 'PS21 Collection',
			actions: [
				{ name: 'collection/' + SET_CURRENT_FILTER.action, param: '' },
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
					canOverride: true
				}
			]
		},
		{
			type: ShortcutTypes.MARQUEE,
			text: 'Take a look at the ',
			label: 'Elevated Lookbook',
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
			text: 'Check out the ',
			label: 'Design Darlings',
			actions: [
				{
					name: 'collection/' + SET_CURRENT_FILTER.action,
					param: 'misc2'
				},
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
					canOverride: true
				}
			]
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
