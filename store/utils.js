import {
	CLIPBOARD_COPY,
	DOWNLOAD_PREPARING,
	IS_MOBILE,
	SHORTENED_URL,
	FETCH_VARIOUS,
	DASHBOARD_DARK,
	MENU_SHOW,
	AUDIOPLAYER_DARK,
	TEXT_CURSOR
} from '~/model/constants'

export const state = () => ({
	clipBoardCopyComplete: false,
	downloadPreparing: false,
	isMobile: true,
	shortenedReceiptUrl: '',
	various: {},
	__prod__: process.env.NODE_ENV === 'production',
	dashboardDark: false,
	audioPlayerDark: false,
	showMenu: false,
	textCursorText: ''
})

export const mutations = {
	[FETCH_VARIOUS.mutation](state, data) {
		// console.log(data)
		state.various = {
			...data[0],
			scrollAudio: {
				title:
					data[0].scrollAudio.length &&
					data[0].scrollAudio[0]
						.substring(data[0].scrollAudio[0].lastIndexOf('/') + 1)
						.replace(/_/g, ' ')
						.replace('.mp3', ''),
				src: data[0].scrollAudio[0]
			}
		}
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
	},
	[DASHBOARD_DARK.mutation](state, data) {
		state.dashboardDark = data
	},
	[MENU_SHOW.mutation](state, data) {
		if (data.toggle) {
			state.showMenu = !state.showMenu
		} else {
			state.showMenu = data
		}
	},
	[AUDIOPLAYER_DARK.mutation](state, data) {
		state.audioPlayerDark = data
	},
	[TEXT_CURSOR.mutation](state, data) {
		state.textCursorText = data
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
	},
	[DASHBOARD_DARK.action]({ commit }, data) {
		commit(DASHBOARD_DARK.mutation, data)
	},
	[MENU_SHOW.action]({ commit }, data) {
		commit(MENU_SHOW.mutation, data)
	},
	[AUDIOPLAYER_DARK.action]({ commit }, data) {
		commit(AUDIOPLAYER_DARK.mutation, data)
	},
	[TEXT_CURSOR.action]({ commit }, data) {
		commit(TEXT_CURSOR.mutation, data)
	}
}
