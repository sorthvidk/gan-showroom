import {
	SET_CURRENT_FILTER,
	SET_GROUP_BY_IDENTIFIER,
	SET_GROUP_BY_INDEX,
	COLLECTION_LAYOUT_CHANGE,
	ASSISTANT_MODE,
	OPEN_CONTENT
} from '~/model/constants'

import CollectionLayouts from '~/model/collection-layouts'
import ContentTypes from '~/model/content-types'
import ShortcutTypes from '~/model/shortcut-types'
import AssistantModes from '~/model/assistant-modes'

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
					name: 'collection/' + COLLECTION_LAYOUT_CHANGE.action,
					param: CollectionLayouts.GRID
				},
				{
					name: 'assistant/' + ASSISTANT_MODE.action,
					param: AssistantModes.FILTER_COLLECTION
				}
			],
			windowContent: [
				{
					title: 'PS21 collection',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					canOverride: true,
					assistant: {
						mode: AssistantModes.FILTER_COLLECTION
					}
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
					assistant: {
						mode: AssistantModes.CUSTOM,
						text: {
							headline: 'FILMS',
							bodyText: 'See all the awesome films<br><br><br>BRUH!'
						}
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
			windowContent: 'assets.ditte'
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
					contentId: 'lookBook',
					type: ContentTypes.lookBook,
					statusComponentProps: {
						text: 'Photo credit: Josefine Seifert'
					},
					assistant: {
						mode: AssistantModes.CUSTOM,
						text: 'lookBook'
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
				}
				// {
				// 	name: 'collection/' + COLLECTION_LAYOUT_CHANGE.action,
				// 	param: CollectionLayouts.FUN
				// }
			],
			windowContent: [
				{
					title: 'PS21 collection',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					canOverride: true,
					assistant: {
						mode: AssistantModes.FILTER_COLLECTION
					}
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
					name: 'collection/' + COLLECTION_LAYOUT_CHANGE.action,
					param: CollectionLayouts.GRID
				}
			],
			windowContent: [
				{
					title: 'PS21 collection',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					canOverride: true,
					assistant: {
						mode: AssistantModes.FILTER_COLLECTION
					}
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
					name: 'collection/' + COLLECTION_LAYOUT_CHANGE.action,
					param: CollectionLayouts.GRID
				}
			],
			windowContent: [
				{
					title: 'PS21 collection',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					canOverride: true,
					assistant: {
						mode: AssistantModes.FILTER_COLLECTION
					}
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
					type: ContentTypes.collage,
					assistant: {
						mode: AssistantModes.COLLAGE
					}
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
					name: 'collection/' + COLLECTION_LAYOUT_CHANGE.action,
					param: CollectionLayouts.GRID
				}
			],
			windowContent: [
				{
					title: 'PS21 collection',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					canOverride: true,
					assistant: {
						mode: AssistantModes.FILTER_COLLECTION
					}
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
					name: 'collection/' + COLLECTION_LAYOUT_CHANGE.action,
					param: CollectionLayouts.GRID
				}
			],
			windowContent: [
				{
					title: 'PS21 collection',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					canOverride: true,
					assistant: {
						mode: AssistantModes.FILTER_COLLECTION
					}
				}
			]
		},
		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'exhibition',
			icon: '/img/shortcuts/rails.png',
			label: 'rails (new)',
			posH: 3,
			posV: 3,
			windowContent: [
				{
					title: 'rails',
					contentId: 'exhibition',
					type: ContentTypes.exhibition,
					statusComponentProps: {
						text: 'PRE SPRING 21 RAILS'
					},
					assistant: {
						mode: AssistantModes.CUSTOM,
						text: {
							headline: 'PRE SPRING 21 RAILS',
							bodyText:
								'This is the new rail section. Click on an image to explore the rail'
						}
					}
				}
			]
		},

		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'puzzle',
			label: 'Puzzle',
			icon: '/img/shortcuts/puzzle.png',
			posH: 10,
			posV: 5,
			windowContent: [
				{
					title: 'Puzzle',
					contentId: 'puzzle',
					type: ContentTypes.puzzle,
					assistant: {
						mode: AssistantModes.PUZZLE
					}
				}
			]
		},

		{
			type: ShortcutTypes.WINDOW,
			shortcutId: 'annas',
			icon: '/img/shortcuts/anna.png',
			label: 'Annas',
			posH: 3,
			posV: 2,
			windowContent: [
				{
					title: 'Annas Copenhagen',
					contentId: 'annas', // should match assets[contentId] to define content
					type: ContentTypes.lookBook,
					statusComponentProps: {
						text: 'Welcome to CPH, Annas Copenhagen'
					},
					assistant: {
						mode: AssistantModes.CUSTOM,
						text: {
							headline: 'ANNA for the win',
							bodyText: 'Lorem Ipsum'
						}
					}
				}
			]
		}
	]
})

export const getters = {
	// filter out shortcuts that opens a group,
	// that is not part of the authorized groups
	authorizedShortcuts: (state, getters, rootState, rootGetters) => {
		return state.list.filter(s => {
			// authorize by default
			if (!s.actions) return true

			// authorize if actions are not pw protected
			// (i.e. doesn't include an action that shows a maybe hidden group)
			if (
				!s.actions
					.map(a => a.name)
					.find(name => name.includes(SET_GROUP_BY_IDENTIFIER.action))
			)
				return true

			// we're left with shortcuts that includes an action that might show a hidden group
			return s.actions.find(action => {
				const isRelevantAction = action.name.includes(
					SET_GROUP_BY_IDENTIFIER.action
				)

				// authorize the shortcut if the action opens a group,
				// and that group is part of the authorized groups
				return (
					isRelevantAction &&
					rootGetters['collection/authorizedGroupsIds'].includes(action.param)
				)
			})
		})
	}
}

export const mutations = {}

export const actions = {}
