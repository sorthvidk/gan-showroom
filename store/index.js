import { 
	CONNECT_ASSETS, 
	TOPMOST_WINDOW, 
	CLOSE_WINDOW, 
	CLOSE_WINDOW_GROUP, 
	OPEN_CONTENT, 
	ESC_KEYPRESS,
	UPDATE_WINDOW, 
	OPEN_GALLERY, 
	OPEN_WISH_LIST, 
	OPEN_STYLE_CONTENT, 
	PROGRESS_UPDATE, 
} from '~/model/constants'

import ContentTypes from '~/model/content-types'
import _ from 'lodash';

import getUniqueId from '~/utils/get-unique-id';
import getAssetType from '~/utils/asset-type'
import isMobile from '~/utils/is-mobile';

const WINDOW_CHROME_HEIGHT = 71;
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
	 *	Activate content block, opens window with matching contentComponent
	 *
	 */
	[OPEN_CONTENT.mutation] (state, params) {
		console.warn("OPEN_CONTENT",params)
		

		let windowContent = params.windowContent;

		let windowGroup;
		if ( params.addToGroupId ) {
			windowGroup = state.windowGroupList.filter(e=>e.groupId === params.addToGroupId)[0];
		} else {
			windowGroup = {
				groupId: '' + getUniqueId(),
				windowIds: [],
				contentIds: [],
				groupSize: 0
			};
		}
		
		let windowsLength = state.windowList.length;

		let cl = windowContent.length;
		for (var i = 0; i < cl; i++) {
			let contentItem = windowContent[i];
			
			let contentType = contentItem.type,
				contentName = contentItem.title,
				contentId = contentItem.contentId;

			let allowInstantiation = true;

			let alreadyExists = state.content.list.filter(e => e.contentId === contentId).length > 0;

			if ( alreadyExists ) {
				if ( contentItem.canOverride ) {
					state.windowList = state.windowList.filter(e => e.contentType !== contentType);
				}
				else {
					allowInstantiation = false;
				}
			}


			if ( allowInstantiation ) {

				state.content.list.push(contentItem);

				let windowProps = {x:10,y:10, w:contentType.defaultWindowProps.smallWidth, h:contentType.defaultWindowProps.smallHeight};
				if ( !isMobile() ) {
					windowProps = {x:140, y:20, w: contentType.defaultWindowProps.largeWidth+WINDOW_CHROME_WIDTH, h:contentType.defaultWindowProps.largeHeight+WINDOW_CHROME_HEIGHT};
				}

				//override dimensions if needed
				if ( contentItem.windowProps && contentItem.windowProps.width ) windowProps.w = contentItem.windowProps.width;
				if ( contentItem.windowProps && contentItem.windowProps.height ) windowProps.w = contentItem.windowProps.height;

				let newWindow = {
					windowId: '' + getUniqueId(),
					contentId: contentId,
					contentType: contentType,
					contentName: contentName,
					groupId: windowGroup.groupId,
					title: contentItem.title,

					contentComponent: contentType.contentComponent,					
					contentComponentProps: contentItem.contentComponentProps,
					
					statusComponent: contentType.statusComponent,
					statusComponentProps: contentItem.statusComponentProps,
					
					windowProps: contentItem.windowProps ? contentItem.windowProps : {}
				};

				let offset = isMobile() ? 5 : 30;
				
				newWindow.windowProps.positionX = windowProps.x + windowsLength*10 + i*offset; 
				newWindow.windowProps.positionY = windowProps.y + windowsLength*10 + i*offset;
				newWindow.windowProps.sizeW = windowProps.w; 
				newWindow.windowProps.sizeH = windowProps.h; 
				
				if ( contentItem.statusComponentProps && contentItem.statusComponentProps.noStatus ) newWindow.windowProps.sizeH -= 30;

				newWindow.positionZ = contentItem.windowProps && contentItem.windowProps.positionZ ? contentItem.windowProps.positionZ : state.highestZIndex + 1;
				
				state.windowList.push(newWindow);
				windowsLength++;

				windowGroup.windowIds.push(newWindow.windowId);
				windowGroup.contentIds.push(newWindow.contentId);
				windowGroup.groupSize++;

				state.zIndexes.push(newWindow.positionZ)
				state.highestZIndex++;

				state.topMostWindow = newWindow;
			}
		}

		//only add the group if it has content
		if ( windowGroup.groupSize > 0 && !params.addToGroupId ) state.windowGroupList.push(windowGroup);

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

		state.content.list = state.content.list.filter(e => e.contentId !== ids.contentId)
		

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

			state.content.list = state.content.list.filter(e => e.contentId !== ids.contentId)

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
	},
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
	[CLOSE_WINDOW_GROUP.action] ({ commit }) {
		commit(CLOSE_WINDOW_GROUP.mutation)
	},
	[UPDATE_WINDOW.action] ({ commit }, params) {
		commit(UPDATE_WINDOW.mutation, params)
	},


	[ESC_KEYPRESS.action] ({ commit }) {
		commit(CLOSE_WINDOW_GROUP.mutation)
	},
	[OPEN_STYLE_CONTENT.action] ({ commit, state }, styleId ) {

		let listStyle = state.collection.list.filter(e => e.styleId === styleId)[0];
		if ( !listStyle ) return false;

		let content = [];
		let al = listStyle.assets.length;

		//backwards loop to ensure asset [0] gets on top (as sorted in $store)
		for (var i = al-1; i >= 0; i--) {
			let asset = listStyle.assets[i];

			if ( asset.visible ) {
				let type = getAssetType(asset);
				content.push({
					title: asset.name,
					contentId: asset.assetId,
					type: type,
					canOverride: false,
					windowProps: type.defaultWindowProps,
					contentComponentProps: { asset: asset },
					statusComponentProps: type.defaultStatusComponentProps
				});
			}
		}
		
		commit('collection/'+PROGRESS_UPDATE.mutation, styleId );

		commit(OPEN_CONTENT.mutation, {windowContent: content})

	},
	[OPEN_GALLERY.action] ({ commit }, asset) {
		let galleryContent = [
			{
				title:'Style gallery',
				contentId: 'gallery',
				type: ContentTypes.gallery,
				canOverride: true,
				contentComponentProps: {
					styleId: asset.styleId,
					focusedAsset: asset
				},
				windowProps: {
					positionZ: 4500,
					noStatus: true,
					isMaximized: true,
					canResize: false,
					modifierClass:'window--gallery',
				}
			}
		];
		commit(OPEN_CONTENT.mutation, {windowContent:galleryContent})
	},

	[OPEN_WISH_LIST.action] ({ commit }, asset) {
		let galleryContent = [
			{
				title:'Your wishlist',
				contentId: 'wish-list',
				type: ContentTypes.wishList,
				canOverride: false,
				windowProps: {
					modifierClass:'window--wish-list',
				}
			}
		];
		commit(OPEN_CONTENT.mutation, {windowContent:galleryContent})
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
