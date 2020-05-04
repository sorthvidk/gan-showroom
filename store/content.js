export const state = () => ({	
	list: [
		{
			title:'Lorem ipsum dolor',
			component:'collection', 
			contentId:'collection',
			allowedInstances: 1,
			componentProps: { 
				filterIds:[] 
			},
			windowProps: {
				width: 4*180,
				height: 400
			},
			isActive:false,
			modifierClass:''
		},
		{
			title:'Image 1',
			component:'image-viewer',
			contentId:'image-portrait',
			allowedInstances: -1,
			isActive:false,
			windowProps: {
				width: 274,
				height: 416,
				modifierClass:'window--tight',
				canMaximize: true,
				canClose: false
			}, 
			componentProps: { 
				imageUrlDefault:'//placeimg.com/300/250/people',				
			}
		},
		{
			title:'Image 2',
			component:'image-viewer',
			contentId:'image2',
			allowedInstances: -1,
			isActive:false,
			windowProps: {
				width: 200,
				height: 400,
				modifierClass:'window--tight',
				canMaximize: true,
				canClose: false
			}, 
			componentProps: { 
				imageUrlDefault:'//placeimg.com/200/400/people',				
			}
		},
		{
			title:'Image 3',
			contentId:'image3',
			component:'image-viewer',
			isActive:false,
			windowProps: {
				width: 200,
				height: 400,
				modifierClass:'window--tight',
				canMaximize: true,
				canClose: false
			}, 
			componentProps: { 
				imageUrlDefault:'//placeimg.com/200/400/people',				
			}
		},
		{
			title:'Image 4',
			contentId:'image4',
			component:'image-viewer',
			isActive:false,
			windowProps: {
				width: 200,
				height: 400,
				modifierClass:'window--tight',
				canMaximize: true,
				canClose: false
			}, 
			componentProps: { 
				imageUrlDefault:'//placeimg.com/200/400/people',				
			}
		},
		{
			title:'Image 5',
			contentId:'image5',
			component:'image-viewer',
			isActive:false,
			windowProps: {
				width: 200,
				height: 400,
				modifierClass:'window--tight',
				canMaximize: true,
				canClose: false
			}, 
			componentProps: { 
				imageUrlDefault:'//placeimg.com/200/400/people',				
			}
		},
		{
			title:'Image 6',
			contentId:'image6',
			component:'image-viewer',
			isActive:false,
			windowProps: {
				width: 200,
				height: 400,
				modifierClass:'window--tight',
				canMaximize: true,
				canClose: false
			}, 
			componentProps: { 
				imageUrlDefault:'//placeimg.com/200/400/people',				
			}
		}
	],
});


export const mutations = {};


export const actions = {};