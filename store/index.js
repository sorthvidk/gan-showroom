import { TOPMOST_WINDOW, CLOSE_WINDOW, OPEN_CONTENT } from '../store/constants'

export const state = () => ({
	contentList: [
		{
			title:'Lorem ipsum dolor',
			contentId:'content1',
			component:'collection', 
			props: { collectionId:'234897234' },
			isActive:false
		},
		{
			title:'Lorem ipsum dolor',
			contentId:'content2',
			component:'collection', 
			props: { collectionId:'897345983' },
			isActive:false
		},
		{
			title:'Lorem ipsum dolor',
			contentId:'content3',
			component:'collection', 
			props: { collectionId:'291173006' },
			isActive:false
		}
	],

	shortcutList: [
		{
			shortcutId:'shortcut1',
			posH:1,
			posV:1,
			widthSpan:2, 
			contentId:'content1' 
		},
		{
			shortcutId:'shortcut2',
			posH:1, 
			posV:3, 
			widthSpan:2,
			contentId:'content2'
			
		},
		{
			shortcutId:'shortcut3',
			posH:23, 
			posV:1, 
			widthSpan:2,
			contentId:'content3'
		}
	],

	windowList: [
		// {
		// 	id:'38972342n342894u234', 
		// 	title:'New collection 2020',
		// 	x:300,y:20,w:733,h:300, z:50, 
		// 	component:'collection', 
		// 	props: { collectionId:'234897234' }
		// },
		// {
		// 	id:'80hj23489dsf670953b', 
		// 	title:'Test lorem',x:
		// 	100,y:600,w:300,h:500, z:20,  
		// 	component:'collection', 
		// 	props:  { collectionId:'77334455' }
		// }
	],
	[TOPMOST_WINDOW.stateKey]: null
})

export const mutations = {
	setBlogPosts (state, list) {
		state.blogPosts = list
	},
	[TOPMOST_WINDOW.mutation] (state, payload) {
		state[TOPMOST_WINDOW.stateKey] = payload
	},
	[CLOSE_WINDOW.mutation] (state, ids) {

		let matchingContent = state.contentList.filter(e => e.contentId === ids.contentId)
		if ( matchingContent && matchingContent[0] ) {
			matchingContent[0].isActive = false;			
			state.windowList = state.windowList.filter(e => e.windowId !== ids.windowId)
		}
	},
	[OPEN_CONTENT.mutation] (state, contentId) {
		console.log("contentId",contentId)
		let matchingContent = state.contentList.filter(e => e.contentId === contentId)
		if ( matchingContent && matchingContent[0] && !matchingContent[0].isActive  ) {
			let newWindow = {
				x:100, y:100, w:400, h:300, z:1, 
				windowId: '' + Math.random().toString(36).substr(2, 9),
				contentId: contentId,
				title: matchingContent[0].title,
				component: matchingContent[0].component, 
				props: matchingContent[0].props
			};
			
			matchingContent[0].isActive	= true;
			state.windowList.push(newWindow);
		}
	}
}

export const actions = {
	[TOPMOST_WINDOW.action] ({ commit }, windowId) {
		commit(TOPMOST_WINDOW.mutation, windowId)
	},	
	[CLOSE_WINDOW.action] ({ commit }, ids) {
		commit(CLOSE_WINDOW.mutation, ids)
	},
	[OPEN_CONTENT.action] ({ commit }, contentId) {
		commit(OPEN_CONTENT.mutation, contentId)
	},

	async nuxtServerInit ({ commit }) {
		let files = await require.context(
			'~/assets/content/blog/',
			false,
			/\.json$/
		)
		let blogPosts = files.keys().map(key => {
			let res = files(key)
			res.slug = key.slice(2, -5)
			return res
		})
		await commit('setBlogPosts', blogPosts)
	}
}
