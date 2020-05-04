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
			content: [
				{
					title:'PS21 collection 🔥',
					type: ContentTypes.collection,
					action: 'collection/'+SET_CURRENT_FILTER,
					actionParam: '',
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
			content: [
				{
					title:'PS21 collection 🔥',
					type: ContentTypes.collection,
					action: 'collection/'+SET_CURRENT_FILTER,
					actionParam: 'c2',
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
			content: []
		}
	]
});

export const mutations = {};


export const actions = {};