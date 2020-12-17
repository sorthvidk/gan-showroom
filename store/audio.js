import {
	AUDIO_TRACK,
	AUDIO_PROGRESS,
	SCROLL_PROGRESS,
	AUDIO_PLAYING,
	AUDIO_SCROLLABLE,
	IS_INTRO
} from '~/model/constants'

export const state = () => ({
	audioActivate: true,
	track: {},
	audioPlaying: true,
	audioProgress: 0,
	scrollProgress: 0,
	audioIsScrollable: false,
	isIntro: true
})

export const mutations = {
	[AUDIO_TRACK.mutation](state, data) {
		state.track = data
	},
	[AUDIO_PLAYING.mutation](state, data) {
		state.audioPlaying = data
	},
	[AUDIO_PROGRESS.mutation](state, data) {
		state.audioProgress = data
	},
	[SCROLL_PROGRESS.mutation](state, data) {
		state.scrollProgress = data
	},
	[AUDIO_SCROLLABLE.mutation](state, data) {
		state.audioIsScrollable = data
	},
	[IS_INTRO.mutation](state) {
		state.isIntro = false
	}
}

export const actions = {
	[AUDIO_TRACK.action]({ commit }, data) {
		commit(AUDIO_TRACK.mutation, data)
	},
	[AUDIO_PLAYING.action]({ commit }, data) {
		commit(AUDIO_PLAYING.mutation, data)
	},
	[AUDIO_PROGRESS.action]({ commit }, data) {
		commit(AUDIO_PROGRESS.mutation, data)
	},
	[SCROLL_PROGRESS.action]({ commit }, data) {
		commit(SCROLL_PROGRESS.mutation, data)
	},
	[AUDIO_SCROLLABLE.action]({ commit }, data) {
		commit(AUDIO_SCROLLABLE.mutation, data)
	},
	[IS_INTRO.action]({ commit }) {
		commit(IS_INTRO.mutation)
	}
}
