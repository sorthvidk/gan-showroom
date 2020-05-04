import { SET_CURRENT_FILTER } from '~/model/constants'

import ContentTypes from '~/model/content-types'

export const state = () => ({	
	list: [
		{
			shortcutId:'collection-PS21',
			icon: '📁',
			label: "PS21 collection 🔥",
			posH: 1,
			posV: 1,
			widthSpan: 2, 
			action: 'collection/'+SET_CURRENT_FILTER.action,
			actionParam: '',
			content: [
				{
					title:'PS21 collection 🔥',
					type: ContentTypes.collection,
					componentProps: {}
				}
			]
		},
		{
			shortcutId:'animal-print',
			icon: '📁',
			label: "Animal Print 🐯",
			posH: 1,
			posV: 3,
			widthSpan: 2, 
			action: 'collection/'+SET_CURRENT_FILTER.action,
			actionParam: 'c2',
			content: [
				{
					title:'PS21 collection 🔥',
					type: ContentTypes.collection,
					componentProps: {}
				}
			]
		},
		{
			shortcutId:'dittes-folder',
			icon:'🗂',
			label: "Private ♥️",
			posH: 3, 
			posV: 1, 
			widthSpan: 2,
			action: null,
			actionParam: null,
			content: []
		}
	]
});

export const mutations = {};


export const actions = {};