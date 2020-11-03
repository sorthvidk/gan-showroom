import {
	CONNECT_EXHIBITION_ASSETS,
	OPEN_EXHIBITION_CONTENT,
	OPEN_CONTENT,
	EXHIBITION_FETCH,
	EXHIBITION_ASSETS_FETCH
} from '~/model/constants'

import getAssetType from '~/utils/asset-type'
import AssistantModes from '~/model/assistant-modes'

export const state = () => ({
	assetsConnected: false,
	list: [],
	assets: []
})

export const mutations = {
	[CONNECT_EXHIBITION_ASSETS.mutation](state) {
		if (state.assetsConnected) return false

		state.list.forEach(exhibition => {
			exhibition.assets = state.assets.filter(
				a => a.exhibitionId === exhibition.exhibitionId
			)
		})

		//to ensure only one connection operation
		state.assetsConnected = true
	},

	[EXHIBITION_FETCH.mutation](state, data) {
		state.list = data
	},

	[EXHIBITION_ASSETS_FETCH.mutation](state, data) {
		state.assets = data
	}
}

export const actions = {
	[OPEN_EXHIBITION_CONTENT.action]({ commit, state }, exhibitionId) {
		let exhibition = state.list.find(e => e.exhibitionId === exhibitionId)

		if (!exhibition) return false

		const windowContent = exhibition.assets.map(asset => ({
			title: asset.name,
			contentId: asset.assetId,
			type: getAssetType(asset),
			canOverride: false,
			windowProps: getAssetType(asset).defaultWindowProps,
			contentComponentProps: { asset },
			// statusComponentProps: {
			// 	text: 'TIP! Hit ESC to close all'
			// },
			assistant: {
				mode: AssistantModes.CUSTOM,
				text: {
					headline: exhibition.name,
					bodyText: exhibition.description
				}
			}
		}))

		commit(OPEN_CONTENT.mutation, { windowContent }, { root: true })
	},

	[CONNECT_EXHIBITION_ASSETS.action]({ commit }) {
		commit(CONNECT_EXHIBITION_ASSETS.mutation)
	}
}
