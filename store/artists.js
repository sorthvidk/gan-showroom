import {
	CONNECT_ARTIST_ASSETS,
	OPEN_ARTIST_CONTENT,
	OPEN_CONTENT,
	CLOSE_WINDOW_GROUP
} from '~/model/constants'


import getAssetType from '~/utils/asset-type'

export const state = () => ({
	assetsConnected: false,
	list: [],
	assets: []
})

export const mutations = {
	[CONNECT_ARTIST_ASSETS.mutation](state) {
		if (state.assetsConnected) return false

		let al = state.assets.length

		for (var i = 0; i < al; i++) {
			let asset = state.assets[i]

			let artist = state.list.find(e => e.artistId === asset.artistId)
			if (artist && artist.assets) artist.assets.push(asset)
			else if (window.GS_LOGS)
				console.warn('NO ARTIST FOR ASSET | artistId: "' + asset.artistId + '"')
		}

		//to ensure only one connection operation
		state.assetsConnected = true
	}
}

export const actions = {
	[OPEN_ARTIST_CONTENT.action]({ commit,state }, artistId) {
		let listArtist = state.list.filter(e => e.artistId === artistId)[0]
		if (!listArtist) return false

		let content = []
		let al = listArtist.assets.length

		for (var i = 0; i < al; i++) {
			let asset = listArtist.assets[i]

			let type = getAssetType(asset)

			content.push({
				title: asset.name,
				contentId: asset.assetId,
				type: type,
				canOverride: false,
				windowProps: type.defaultWindowProps,
				contentComponentProps: { asset: asset },
				statusComponentProps: {
					text: 'TIP! Hit ESC to close all'
				}	
			})
		}

		commit(OPEN_CONTENT.mutation, {
			windowContent: content
		}, {
			root: true
		})
	}
}
