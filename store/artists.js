import {
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

export const mutations = {}

export const actions = {

	[OPEN_ARTIST_CONTENT.action]({ commit,state }, artistId) {
		let listArtist = state.list.filter(e => e.artistId === artistId)[0]
		if (!listArtist) return false

		let content = []
		let al = listArtist.assets.length

		//backwards loop to ensure asset [0] gets on top (as sorted in $store)
		for (var i = al - 1; i >= 0; i--) {
			let asset = listArtist.assets[i]

			let type = getAssetType(asset)

			content.push({
				title: asset.name,
				contentId: asset.assetId,
				type: type,
				canOverride: false,
				windowProps: type.defaultWindowProps,
				contentComponentProps: { asset: asset },
				statusComponentProps: type.defaultStatusComponentProps
			})
		}

		commit(OPEN_CONTENT.mutation, {
			windowContent: content
		}, {
			root: true
		})
	}
}
