import { TOPMOST_WINDOW, CLOSE_WINDOW, CLOSE_WINDOW_GROUP, OPEN_CONTENT, ESC_KEYPRESS } from '../store/constants'

export const state = () => ({
	contentList: [
		{
			title:'Lorem ipsum dolor',
			contentId:'collection1',
			component:'collection', 
			props: { collectionId:'234897234' },
			isActive:false
		},
		{
			title:'Lorem ipsum dolor',
			contentId:'collection2',
			component:'collection', 
			props: { collectionId:'897345983' },
			isActive:false
		},
		{
			title:'Lorem ipsum dolor',
			contentId:'collection3',
			component:'collection', 
			props: { collectionId:'291173006' },
			isActive:false
		},
		{
			title:'Image 1',
			contentId:'image1',
			component:'image-viewer', 
			props: { },
			isActive:false
		},
		{
			title:'Image 2',
			contentId:'image2',
			component:'image-viewer', 
			props: { },
			isActive:false
		},
		{
			title:'Image 3',
			contentId:'image3',
			component:'image-viewer', 
			props: { },
			isActive:false
		},
		{
			title:'Image 4',
			contentId:'image4',
			component:'image-viewer', 
			props: { },
			isActive:false
		},
		{
			title:'Image 5',
			contentId:'image5',
			component:'image-viewer', 
			props: { },
			isActive:false
		},
		{
			title:'Image 6',
			contentId:'image6',
			component:'image-viewer', 
			props: { },
			isActive:false
		}
	],

	shortcutList: [
		{
			shortcutId:'shortcut1',
			posH:1,
			posV:1,
			widthSpan:2, 
			contentId:'collection1' 
		},
		{
			shortcutId:'shortcut2',
			posH:1, 
			posV:3, 
			widthSpan:2,
			contentId:'collection2'
			
		},
		{
			shortcutId:'shortcut3',
			posH:23, 
			posV:1, 
			widthSpan:2,
			contentId:'collection3'
		}
	],

	windowGroupList: [],
	
	windowList: [],

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
	[CLOSE_WINDOW_GROUP.mutation] (state) {
		let groupsLength = state.windowGroupList.length;
		console.log("groupsLength",groupsLength)
		if ( groupsLength < 1 ) return false;

		let windowGroup = state.windowGroupList[groupsLength-1]; //get latest group

		for (var i = 0; i < windowGroup.groupSize; i++) {
			let ids = {windowId: windowGroup.windowIds[i],contentId: windowGroup.contentIds[i]};
			let matchingContent = state.contentList.filter(e => e.contentId === ids.contentId)
			
			if ( matchingContent && matchingContent[0] ) {
				matchingContent[0].isActive = false;			
				state.windowList = state.windowList.filter(e => e.windowId !== ids.windowId)
			}
		}
		state.windowGroupList.pop(); //remove that group
	},
	[OPEN_CONTENT.mutation] (state, contentIds) {
		let newWindowGroup = {
			groupId: '' + Math.random().toString(36).substr(2, 9),
			windowIds: [],
			contentIds: [],
			groupSize: 0
		};
		for (var i = 0; i < contentIds.length; i++) {

			let contentId = contentIds[i];
			let matchingContent = state.contentList.filter(e => e.contentId === contentId)
			if ( matchingContent && matchingContent[0] && !matchingContent[0].isActive  ) {
				let newWindow = {
					x:140+i*30, y:20+i*30, w:500, h:400, z:1, 
					windowId: '' + Math.random().toString(36).substr(2, 9),
					contentId: contentId,
					groupId: newWindowGroup.groupId,
					title: matchingContent[0].title,
					component: matchingContent[0].component, 
					props: matchingContent[0].props
				};
				
				matchingContent[0].isActive	= true;
				
				state.windowList.push(newWindow);

				newWindowGroup.windowIds.push(newWindow.windowId);
				newWindowGroup.contentIds.push(newWindow.contentId);
				newWindowGroup.groupSize++;
			}
		}

		state.windowGroupList.push(newWindowGroup);
	}
}

export const actions = {
	[TOPMOST_WINDOW.action] ({ commit }, windowId) {
		commit(TOPMOST_WINDOW.mutation, windowId)
	},	
	[CLOSE_WINDOW.action] ({ commit }, ids) {
		commit(CLOSE_WINDOW.mutation, ids)
	},
	[OPEN_CONTENT.action] ({ commit }, contentIds) {
		commit(OPEN_CONTENT.mutation, contentIds)
	},
	[ESC_KEYPRESS.action] ({ commit }) {
		commit(CLOSE_WINDOW_GROUP.mutation)
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
