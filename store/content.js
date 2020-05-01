export const state = () => ({	
	list: [
		{
			title:'Lorem ipsum dolor',
			contentId:'collection',
			component:'collection', 
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
			contentId:'image1',
			component:'image-viewer',
			isActive:false,
			windowProps: {
				width: 300,
				height: 250,
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
			contentId:'image2',
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