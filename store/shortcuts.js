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
					title: 'PS21 collection 🔥',
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					componentProps: {},
					canOverride: true
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
					contentId: 'ps21-collection',
					type: ContentTypes.collection,
					componentProps: {},
					canOverride: true
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
			content: [
				{
					title:'Ditte image 1',
					contentId: 'ditte-image1',
					type: ContentTypes.imagePortrait,
					canOverride: false,
					componentProps: {
						asset: {
							defaultImageUrl:'/img/ditte/190808_GANNI_LANDVIK_SHOT_12_1260.jpg'
						}
					}
				},
				{
					title:'Ditte image 2',
					contentId: 'ditte-image2',
					type: ContentTypes.imagePortrait,
					canOverride: false,
					componentProps: {
						asset: {
							defaultImageUrl:'/img/ditte/191101_Ganni_PF20_Jakob_04_0105_1.jpg'
						}
					}
				},
				{
					title:'Ditte letter',
					contentId: 'ditte-letter',
					type: ContentTypes.textFile,
					canOverride: false,
					componentProps: {
						text:'Dear friend,<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lectus quis sem lacinia nonummy. Proin mollis lorem non dolor. In hac habitasse platea dictumst. Nulla ultrices odio. Donec augue. Phasellus dui. Maecenas facilisis nisl vitae nibh. Proin vel seo est vitae eros pretium dignissim. Aliquam aliquam sodales orci. Suspendisse potenti. Nunc adipiscing euismod arcu. Quisque facilisis mattis lacus. Fusce bibendum, velit in venenatis viverra, tellus ligula dignissim felis, quis euismod mauris tellus ut urna. Proin scelerisque. Nulla in mi. Integer ac leo. Nunc urna ligula, gravida a, pretium vitae, bibendum nec, ante. Aliquam ullamcorper iaculis lectus. Sed vel dui. Etiam lacinia risus vitae lacus. Aliquam elementum imperdiet turpis. In id metus. Mauris eu nisl. Nam pharetra nisi nec enim. Nulla aliquam, tellus sed laoreet blandit, eros urna vehicula lectus, et vulputate mauris arcu ut arcu. Praesent eros metus lirum larum, accumsan a, malesuada et, commodo vel, nulla. Aliquam sagittis auctor sapien. Morbi a nibh.<br/><br/>Love from Ditte and the Ganni team!'
					}
				}
			]
		}
	]
});

export const mutations = {};


export const actions = {};