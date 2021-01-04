import {
	CLIPBOARD_COPY,
	DOWNLOAD_PREPARING,
	IS_MOBILE,
	SHORTENED_URL,
	FETCH_VIMEO
} from '~/model/constants'

export const state = () => ({
	clipBoardCopyComplete: false,
	downloadPreparing: false,
	isMobile: true,
	shortenedReceiptUrl: '',
	videoId: '',
	__prod__: process.env.NODE_ENV === 'production'
})

export const mutations = {
	[FETCH_VIMEO.mutation](state, data) {
		state.videoId = data[0].vimeoUrl
	},
	[CLIPBOARD_COPY.mutation](state, data) {
		if (window.GS_LOGS) console.warn('CLIPBOARD_COPY')
		state.clipBoardCopyComplete = data
	},
	[DOWNLOAD_PREPARING.mutation](state, data) {
		if (window.GS_LOGS) console.warn('DOWNLOAD_PREPARING')
		state.downloadPreparing = data
	},
	[IS_MOBILE.mutation](state, data) {
		state.isMobile = data
	},
	[SHORTENED_URL.mutation](state, data) {
		state.shortenedReceiptUrl = data
	}
}

export const actions = {
	[CLIPBOARD_COPY.action]({ commit }, data) {
		commit(CLIPBOARD_COPY.mutation, data)
	},
	[DOWNLOAD_PREPARING.action]({ commit }, data) {
		commit(DOWNLOAD_PREPARING.mutation, data)
	},
	[IS_MOBILE.action]({ commit }, data) {
		commit(IS_MOBILE.mutation, data)
	},
	[SHORTENED_URL.action]({ commit }, data) {
		commit(SHORTENED_URL.mutation, data)
	}
}
