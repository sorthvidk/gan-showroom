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
	passwordUsed: '',

	cookiesAccepted: false,
	copyrightAccepted: false,

	mousepos: { x: 0, y: 0 },
	keyPressed: null,

	passwords: {}
})

export const mutations = {
	[LOGIN.mutation](state, authorized) {
		state.loggedIn = authorized && authorized.hash
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
		state.passwords = data.map(pw => {
			pw.hash = pw.hash.toLowerCase()
			return pw
		})
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
