import { TOPMOST_WINDOW, CLOSE_WINDOW, ACTIVATE_SHORTCUT } from '../store/constants'

export const state = () => ({
	shortcutList: [
		{
			id:'knfgoi34',
			posH:1, 
			posV:1, 
			widthSpan:2, 
			isActivated:false,
			component:'collection', 
			props: { collectionId:'234897234' } 
		},
		{
			id:'b8834234',
			posH:3, 
			posV:1, 
			widthSpan:2, 
			isActivated:false,
			component:'collection', 
			props: { collectionId:'897345983' } 
		},
		{
			id:'783n690d9',
			posH:1, 
			posV:3, 
			widthSpan:2, 
			isActivated:false,
			component:'collection', 
			props: { collectionId:'291173006' } 
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
	[CLOSE_WINDOW.mutation] (state, id) {		
		console.log("state.windowList before", state.windowList)
		state.windowList = state.windowList.filter(e => e.id !== id)
		console.log("state.windowList after", state.windowList)
	},
	[ACTIVATE_SHORTCUT.mutation] (state, id) {

		let foundWindow = state.windowList.filter(e => e.id === id)

		console.log("foundWindow",foundWindow)

		if ( foundWindow && !foundWindow[0] ) {
			
			let associatedShortcut = state.shortcutList.filter(e => e.id === id)
			console.log("associatedShortcut",associatedShortcut)

			let newWindow = {
				id: id, 
				title: 'New collection 2020',
				x:200, y:60, w:600, h:300, z:1, 
				component: associatedShortcut[0].component, 
				props: associatedShortcut[0].props
			};
			
			state.windowList.push(newWindow);
		}


	}
}

export const actions = {
	[TOPMOST_WINDOW.action] ({ commit }, windowId) {
		commit(TOPMOST_WINDOW.mutation, windowId)
	},	
	[CLOSE_WINDOW.action] ({ commit }, windowId) {
		commit(CLOSE_WINDOW.mutation, windowId)
	},
	[ACTIVATE_SHORTCUT.action] ({ commit }, shortcutId) {
		console.log("shortcutId",shortcutId)
		commit(ACTIVATE_SHORTCUT.mutation, shortcutId)
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
