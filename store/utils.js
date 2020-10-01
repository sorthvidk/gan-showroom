import {
	VISIBILITY,
	CLIPBOARD_COPY,
	DOWNLOAD_PREPARING
} from '~/model/constants'

export const state = () => ({
	screensaverActive: false,
	clipBoardCopyComplete: false,
	downloadPreparing: false
})

export const mutations = {
	[VISIBILITY.mutation](state, key) {
		state.screensaverActive = key
	},
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
	[VISIBILITY.action]({ commit }, hidden) {
		commit(VISIBILITY.mutation, hidden)
	},
	[CLIPBOARD_COPY.action]({ commit }, value) {
		commit(CLIPBOARD_COPY.mutation, value)
	},
	[DOWNLOAD_PREPARING.action]({ commit }, value) {
		commit(DOWNLOAD_PREPARING.mutation, value)
	}
}
