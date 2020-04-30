import { 
	TOPMOST_WINDOW, 
	CLOSE_WINDOW, 
	CLOSE_WINDOW_GROUP, 
	OPEN_CONTENT, 
	ESC_KEYPRESS,
	UPDATE_WINDOW, 
} from '~/model/constants'

const WINDOW_CHROME_HEIGHT = 62;
const WINDOW_CHROME_WIDTH = 2;

export const state = () => ({
	contentList: [
		{
			title:'Lorem ipsum dolor',
			contentId:'collection1',
			component:'collection', 
			componentProps: { collectionId:'234897234' },
			windowProps: {},
			isActive:false,
			modifierClass:''
		},
		{
			title:'Lorem ipsum dolor',
			contentId:'collection2',
			component:'collection', 
			componentProps: { collectionId:'897345983' },
			windowProps: {},
			isActive:false,
			modifierClass:''
		},
		{
			title:'Lorem ipsum dolor',
			contentId:'collection3',
			component:'collection', 
			componentProps: { collectionId:'291173006' },
			windowProps: {},
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


	windowList: [],
	windowGroupList: [],

	zIndexes: [],
	lowestZIndex: 0,
	highestZIndex: 0
})

export const mutations = {
	setBlogPosts (state, list) {
		state.blogPosts = list
	},
	/* 
	 *	Bring window to top.
	 *
	 */
	[TOPMOST_WINDOW.mutation] (state, windowId) {
		console.log("TOPMOST_WINDOW",windowId)
		let windowsLength = state.windowList.length;
		let zIndexes = [];

		for (var i = 0; i < windowsLength; i++) {
			let currentWindow = state.windowList[i];
			zIndexes.push(currentWindow.z);
		}
		// con{sole.log("zIndexes before",state.zIndexes)
		zIndexes.sort(function(a, b){return a - b});
		// console.log("zIndexes after",state.zIndexes)
		state.zIndexes = zIndexes;
		
		
		let matchingWindow = state.windowList.filter(e => e.windowId === windowId)[0]
		if ( matchingWindow ) {
			matchingWindow.z = state.zIndexes[windowsLength-1]+1;
			state.highestZIndex = matchingWindow.z;
		}
	},
	/* 
	 *	Single window close. Wipes window group history, so user has to close all windows individually after
	 *
	 */
	[CLOSE_WINDOW.mutation] (state, ids) {

		let matchingContent = state.contentList.filter(e => e.contentId === ids.contentId)[0]
		matchingContent.isActive = false;

		let currentWindow = state.windowList.filter(e => e.windowId === ids.windowId)[0]
		
		console.log("zIndexes before",state.zIndexes)

		let searchZ = currentWindow.z;
		//if closing window was lowest, set lowest current index to next lowest window
		if ( searchZ == state.lowestZIndex ) {
			//remove first element
			state.lowestZIndex = state.zIndexes.shift();
		}
		//if closing window was highest, set highest current index to next highest window
		else if ( searchZ == state.highestZIndex ) {
			state.highestZIndex = state.zIndexes.pop();
		}
		else {
			//just remove index
			state.zIndexes.splice(state.zIndexes.indexOf(searchZ), 1);
		}
		
		console.log("zIndexes after",state.zIndexes)

		console.log("state.windowList[0].x before",state.windowList[0].x)
		var newWindowList = [];
		state.windowList.forEach(e => {if (e.windowId !== ids.windowId) newWindowList.push(e)});

		console.log("newWindowList",newWindowList)
		state.windowList = newWindowList
		if ( state.windowList[0] ) console.log("state.windowList[0].x after",state.windowList[0].x)

		//if manual close => no groups to close

		//TODO: search for and remove dead ids
		state.windowGroupList = [];


		console.warn("CLOSE_WINDOW | removed id:"+ids.windowId+", remaining windows: "+state.windowList.length)
	},
	/* 
	 *	Close a window group. Closes the last added group.
	 *
	 */
	[CLOSE_WINDOW_GROUP.mutation] (state) {
		let groupsLength = state.windowGroupList.length;
		
		if ( groupsLength < 1 ) return false;

		let windowGroup = state.windowGroupList[groupsLength-1]; //get latest group

		for (var i = 0; i < windowGroup.groupSize; i++) {
			let ids = {windowId: windowGroup.windowIds[i],contentId: windowGroup.contentIds[i]};

			let matchingContent = state.contentList.filter(e => e.contentId === ids.contentId)[0]
			matchingContent.isActive = false;

			let currentWindow = state.windowList.filter(e => e.windowId === ids.windowId)[0]
			
			let searchZ = currentWindow.z;
			//if closing window was lowest, set lowest current index to next lowest window
			if ( searchZ == state.lowestZIndex ) {
				//remove first element
				state.lowestZIndex = state.zIndexes.shift();
			}
			//if closing window was highest, set highest current index to next highest window
			else if ( searchZ == state.highestZIndex ) {
				state.highestZIndex = state.zIndexes.pop();
			}
			else {
				//just remove index
				state.zIndexes.splice(state.zIndexes.indexOf(searchZ), 1);
			}

			state.windowList = state.windowList.filter(e => e.windowId !== ids.windowId)
		}

		state.windowGroupList.pop(); //remove that group
		console.warn("CLOSE_WINDOW_GROUP | remaining groups: "+state.windowGroupList.length)

		if ( state.windowGroupList.length == 0 ) {
			state.highestZIndex = 0;
			state.lowestZIndex = 0;
		}
	},
	/* 
	 *	Activate content block, opens window with matching component
	 *
	 */
	[OPEN_CONTENT.mutation] (state, contentIds) {
		console.warn("OPEN_CONTENT",contentIds)
		let newWindowGroup = {
			groupId: '' + Math.random().toString(36).substr(2, 9),
			windowIds: [],
			contentIds: [],
			groupSize: 0
		};
		
		let windowsLength = state.windowList.length;

		for (var i = 0; i < contentIds.length; i++) {

			let contentId = contentIds[i];
			let matchingContent = state.contentList.filter(e => e.contentId === contentId)[0]
			if ( !matchingContent.isActive  ) {
				console.log("matchingContent",matchingContent)
				
				let newWindow = {
					windowId: '' + Math.random().toString(36).substr(2, 9),
					contentId: contentId,
					groupId: newWindowGroup.groupId,
					title: matchingContent.title + " _ window "+windowsLength,
					component: matchingContent.component, 
					componentProps: matchingContent.componentProps,
					windowProps: matchingContent.windowProps					
				};

				newWindow.windowProps.positionX = 140 + windowsLength*30 + i*30; 
				newWindow.windowProps.positionY = 20 + windowsLength*30 + i*30; 
				newWindow.windowProps.positionZ = state.highestZIndex + 1;
				newWindow.windowProps.sizeW = matchingContent.windowProps.width ? matchingContent.windowProps.width+WINDOW_CHROME_WIDTH : 500; 
				newWindow.windowProps.sizeH = matchingContent.windowProps.height ? matchingContent.windowProps.height+WINDOW_CHROME_HEIGHT : 400; 
				
				matchingContent.isActive = true;
				
				state.windowList.push(newWindow);
				windowsLength++;

				newWindowGroup.windowIds.push(newWindow.windowId);
				newWindowGroup.contentIds.push(newWindow.contentId);
				newWindowGroup.groupSize++;

				state.zIndexes.push(newWindow.z)
				state.highestZIndex++;

				console.log("newWindow.windowProps",newWindow.windowProps)
			}
		}

		state.windowGroupList.push(newWindowGroup);
	},
	/* 
	 *	Save window position and size values
	 *
	 */
	[UPDATE_WINDOW.mutation] (state, params) {
		let currentWindow = state.windowList.filter(e => e.windowId === params.windowId)[0];
		for(var key in params) {
			currentWindow[key] = params[key];
		}	
	},

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
	[UPDATE_WINDOW.action] ({ commit }, params) {
		commit(UPDATE_WINDOW.mutation, params)
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
