import { 
	CONNECT_ASSETS, 
	TOPMOST_WINDOW, 
	CLOSE_WINDOW, 
	CLOSE_WINDOW_GROUP, 
	OPEN_CONTENT, 
	ESC_KEYPRESS,
	UPDATE_WINDOW, 
} from '~/model/constants'

import ContentTypes from '~/model/content-types'
import _ from 'lodash';

import getUniqueId from '~/utils/get-unique-id';
import isMobile from '~/utils/is-mobile';

const WINDOW_CHROME_HEIGHT = 62;
const WINDOW_CHROME_WIDTH = 2;

export const state = () => ({
	windowList: [],
	windowGroupList: [],
	topMostWindow: null,

	zIndexes: [],
	lowestZIndex: 0,
	highestZIndex: 0
})

export const mutations = {
	
	[CONNECT_ASSETS.mutation] (state) {
		console.warn("CONNECT_ASSETS")

		if ( state.collection.assetsConnected ) return false;

		let al = state.assets.list.length;

		for (var i = 0; i < al; i++) {
			let asset = state.assets.list[i];

			let style = state.collection.list.filter(e => e.styleId === asset.styleId)[0];
			style.assets.push(asset);
		}

		//sort style assets to have onTop asset first in assets array
		let cl = state.collection.list.length;
		for (var j = 0; j < cl; j++) {

			let style = state.collection.list[j];
			let sortedAssets = style.assets.sort(
				(a, b) => a.onTop && !b.onTop ? -1 : 1
			);
			style.assets = sortedAssets;
		}

		//to ensure only one connection operation
		state.collection.assetsConnected = true;
	},



	/* 
	 *	Activate content block, opens window with matching component
	 *
	 */
	[OPEN_CONTENT.mutation] (state, content) {
		console.warn("OPEN_CONTENT",content)
		
		let defaultWindowProps = {x:10,y:10,w:window.innerWidth - 20,h:window.innerHeight - 20};
		if ( !isMobile() ) {
			defaultWindowProps = {x:140, y:20, w:500, h:300};
		}

		let newWindowGroup = {
			groupId: '' + getUniqueId(),
			windowIds: [],
			contentIds: [],
			groupSize: 0
		};
		
		let windowsLength = state.windowList.length;

		let cl = content.length;
		for (var i = 0; i < cl; i++) {
			let contentItem = content[i];
			
			let contentType = contentItem.type,
				contentName = contentItem.title,
				contentId = getUniqueId();


			let possibleIdentical = state.windowList.filter(e => e.contentName === contentName);
			let equalComponentProps = _.isEqual(possibleIdentical.componentProps, contentItem.componentProps);
			let equalActionParam = _.isEqual(possibleIdentical.actionParam, contentItem.actionParam);

			let exactContentAlreadyOpen = 
				possibleIdentical.length > 0 && equalComponentProps && equalActionParam;

			if ( !exactContentAlreadyOpen ) {

				if (contentType.allowedInstances === 1) {
					state.windowList = state.windowList.filter(e => e.contentType !== contentType);
				}

				let newWindow = {
					windowId: '' + getUniqueId(),
					contentId: contentId,
					contentType: contentType,
					contentName: contentName,
					groupId: newWindowGroup.groupId,
					title: contentItem.title,
					component: contentType.component,					
					componentProps: contentItem.componentProps,
					windowProps: contentType.windowProps
				};

				newWindow.windowProps.positionX = defaultWindowProps.x + windowsLength*10 + i*30; 
				newWindow.windowProps.positionY = defaultWindowProps.y + windowsLength*10 + i*10; 
				newWindow.windowProps.sizeW = contentType.windowProps.width ? contentType.windowProps.width+WINDOW_CHROME_WIDTH : defaultWindowProps.w; 
				newWindow.windowProps.sizeH = contentType.windowProps.height ? contentType.windowProps.height+WINDOW_CHROME_HEIGHT : defaultWindowProps.h; 
				
				newWindow.positionZ = state.highestZIndex + 1;
				
				state.windowList.push(newWindow);
				windowsLength++;

				newWindowGroup.windowIds.push(newWindow.windowId);
				newWindowGroup.contentIds.push(newWindow.contentId);
				newWindowGroup.groupSize++;

				state.zIndexes.push(newWindow.positionZ)
				state.highestZIndex++;

				state.topMostWindow = newWindow;
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
		for(var key in params.windowProps) {
			currentWindow.windowProps[key] = params.windowProps[key];
		}	
	},	
	/* 
	 *	Bring window to top.
	 *
	 */
	[TOPMOST_WINDOW.mutation] (state, windowId) {
		//console.log("TOPMOST_WINDOW",windowId)
		let windowsLength = state.windowList.length;
		let newZIndexes = [];

		for (var i = 0; i < windowsLength; i++) {
			let currentWindow = state.windowList[i];
			newZIndexes.push(currentWindow.positionZ);
		}
		//console.log("zIndexes before",state.zIndexes)
		newZIndexes.sort(function(a, b){return a - b});
		state.zIndexes = newZIndexes;
		//console.log("zIndexes after",state.zIndexes)
		
		
		let matchingWindow = state.windowList.filter(e => e.windowId === windowId)[0]
		//console.log("current z", matchingWindow.positionZ )

		if ( matchingWindow ) {			
			state.highestZIndex = matchingWindow.positionZ;
			matchingWindow.positionZ = state.zIndexes[windowsLength-1]+1;
			
			state.topMostWindow = matchingWindow;
		}

	},




	/* 
	 *	Single window close. Wipes window group history, so user has to close all windows individually after
	 *
	 */
	[CLOSE_WINDOW.mutation] (state, ids) {

		// let matchingContent = state.content.list.filter(e => e.contentId === ids.contentId)[0]
		// matchingContent.isActive = false;

		let currentWindow = state.windowList.filter(e => e.windowId === ids.windowId)[0]
		
		let searchZ = currentWindow.positionZ;
		if ( searchZ == state.lowestZIndex ) {
			//if closing window was lowest, set lowest current index to next lowest window
			state.lowestZIndex = state.zIndexes.shift();
		}
		else if ( searchZ == state.highestZIndex ) {
			//if closing window was highest, set highest current index to next highest window
			state.highestZIndex = state.zIndexes.pop();
		}
		else {
			//just remove index
			state.zIndexes.splice(state.zIndexes.indexOf(searchZ), 1);
		}
		
		//remove window
		state.windowList = state.windowList.filter(e => e.windowId !== ids.windowId)


		//search for and remove dead ids in groups
		let groupsLength = state.windowGroupList.length;		
		if ( groupsLength > 0 ) {
			for (var i = groupsLength-1; i >= 0; i--) {						
				let windowGroup = state.windowGroupList[i];
				if ( windowGroup.windowIds.indexOf(ids.windowId) > -1 ) {
					//if id found in id list, remove it
					windowGroup.windowIds.splice(windowGroup.windowIds.indexOf(ids.windowId), 1);
				}
				if ( windowGroup.windowIds.length == 0 ) {
					//if no ids left, remove group
					state.windowGroupList.splice(i,1);
				}
			}
		}


		if ( state.windowGroupList.length == 0 ) {
			state.highestZIndex = 0;
			state.lowestZIndex = 0;
		}

		let wll = state.windowList.length;
		state.topMostWindow = state.windowList[wll-1];

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

			// let matchingContent = state.content.list.filter(e => e.contentId === ids.contentId)[0]
			// matchingContent.isActive = false;

			let currentWindow = state.windowList.filter(e => e.windowId === ids.windowId)[0]
			if ( currentWindow ) {
				let searchZ = currentWindow.positionZ;
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
			}
			state.windowList = state.windowList.filter(e => e.windowId !== ids.windowId)
		}

		state.windowGroupList.pop(); //remove that group
		console.warn("CLOSE_WINDOW_GROUP | remaining groups: "+state.windowGroupList.length)

		if ( state.windowGroupList.length == 0 ) {
			state.highestZIndex = 0;
			state.lowestZIndex = 0;
		}
		
		let wll = state.windowList.length;
		state.topMostWindow = state.windowList[wll-1];
	}

}

export const actions = {
	//first action, injects assets into collection
	[CONNECT_ASSETS.action] ({ commit }) {
		commit(CONNECT_ASSETS.mutation)
	},	


	[TOPMOST_WINDOW.action] ({ commit }, windowId) {
		commit(TOPMOST_WINDOW.mutation, windowId)
	},	
	[CLOSE_WINDOW.action] ({ commit }, ids) {
		commit(CLOSE_WINDOW.mutation, ids)
	},
	[OPEN_CONTENT.action] ({ commit }, content) {
		commit(OPEN_CONTENT.mutation, content)
	},
	[ESC_KEYPRESS.action] ({ commit }) {
		commit(CLOSE_WINDOW_GROUP.mutation)
	},
	[UPDATE_WINDOW.action] ({ commit }, params) {
		commit(UPDATE_WINDOW.mutation, params)
	},

	// async nuxtServerInit ({ commit }) {
	// 	let files = await require.context(
	// 		'~/assets/content/blog/',
	// 		false,
	// 		/\.json$/
	// 	)
	// 	let blogPosts = files.keys().map(key => {
	// 		let res = files(key)
	// 		res.slug = key.slice(2, -5)
	// 		return res
	// 	})
	// 	await commit('setBlogPosts', blogPosts)
	// }
}
