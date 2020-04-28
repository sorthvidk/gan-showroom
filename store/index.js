import { TOPMOST_WINDOW, CLOSE_WINDOW } from '../store/constants'

export const state = () => ({
	shortcutList: [
		{posH:1,posV:1,widthSpan:2}
		,{posH:3,posV:1,widthSpan:2}
		,{posH:1,posV:3,widthSpan:2}
	],
	windowList: [
		{id:'38972342n342894u234', title:'New collection 2020',x:300,y:20,w:733,h:300, z:50},
		{id:'80hj23489dsf670953b', title:'Test lorem',x:100,y:600,w:300,h:500, z:20}
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
	[CLOSE_WINDOW.mutation] (state, payload) {
		state.windowList = state.windowList.filter(e => e.id === payload).slice();
	}
}

export const actions = {
	[TOPMOST_WINDOW.action] ({ commit }, windowId) {
		commit(TOPMOST_WINDOW.mutation, windowId)
	},
	
	[CLOSE_WINDOW.action] ({ commit }, windowId) {
		commit(CLOSE_WINDOW.mutation, windowId)
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
