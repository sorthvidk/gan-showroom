import { CLIPBOARD_COPY, DOWNLOAD_PREPARING } from '~/model/constants'

export const state = () => ({
	clipBoardCopyComplete: false,
	downloadPreparing: false
})

export const mutations = {
	[CLIPBOARD_COPY.mutation](state, value) {
		if (window.GS_LOGS) console.warn('CLIPBOARD_COPY')
		state.clipBoardCopyComplete = value
	},
	[DOWNLOAD_PREPARING.mutation](state, value) {
		if (window.GS_LOGS) console.warn('DOWNLOAD_PREPARING')
		state.downloadPreparing = value
	}
}

export const actions = {
	[CLIPBOARD_COPY.action]({ commit }, value) {
		commit(CLIPBOARD_COPY.mutation, value)
	},
	[DOWNLOAD_PREPARING.action]({ commit }, value) {
		commit(DOWNLOAD_PREPARING.mutation, value)
	}
}
