import {
	LOGIN,
	COPYRIGHT_ACCEPT,
	COOKIES_ACCEPT,
	CLOSE_WINDOW_GROUP,
	KEYPRESS,
	MOUSEMOVE,
	PASSWORDS_FETCH
} from '~/model/constants'

export const state = () => ({
	loggedIn: false,
	password: '16c1443a039ecd26eadb57f6a0ae297e3d5894560bed02de3434af15cc79c009', // = hampsterdance

	cookiesAccepted: false,
	copyrightAccepted: false,

	mousepos: { x: 0, y: 0 },
	keyPressed: null,

	passwords: {}
})

export const mutations = {
	[LOGIN.mutation](state, key) {
		state.loggedIn = key
	},

	[COOKIES_ACCEPT.mutation](state) {
		state.cookiesAccepted = true
	},

	[COPYRIGHT_ACCEPT.mutation](state, value) {
		state.copyrightAccepted = value
	},

	[KEYPRESS.mutation](state, key) {
		state.keyPressed = key
	},

	[MOUSEMOVE.mutation](state, { x, y }) {
		state.mousepos = { x, y }
	},

	[PASSWORDS_FETCH.mutation](state, data) {
		state.passwords = data
	}
}

export const actions = {
	[LOGIN.action]({ commit }, authorized) {
		commit(LOGIN.mutation, authorized)
	},
	[COOKIES_ACCEPT.action]({ commit }, value) {
		commit(COOKIES_ACCEPT.mutation, value)
	},
	[COPYRIGHT_ACCEPT.action]({ commit }, value) {
		commit(COPYRIGHT_ACCEPT.mutation, value)
	},
	[KEYPRESS.action]({ commit }, event) {
		commit(KEYPRESS.mutation, event)

		if (event.key === 'Escape') {
			commit(CLOSE_WINDOW_GROUP.mutation, null, { root: true })
		}
	},
	[MOUSEMOVE.action]({ commit }, event) {
		commit(MOUSEMOVE.mutation, {
			x: event.clientX,
			y: event.clientY
		})
	}
}
