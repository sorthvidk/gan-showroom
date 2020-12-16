import {
	AUDIO_TRACK,
	AUDIO_PROGRESS,
	SCROLL_PROGRESS,
	AUDIO_PLAYING,
	AUDIO_DONE
} from '~/model/constants'

export const state = () => ({
	track: {},
	audioPlaying: false,
	audioProgress: 0,
	scrollProgress: 0,
	audioGalleryDone: false
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
	[AUDIO_DONE.mutation](state) {
		state.audioGalleryDone = true
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
	[AUDIO_DONE.action]({ commit }) {
		commit(AUDIO_DONE.mutation)
	}
}
