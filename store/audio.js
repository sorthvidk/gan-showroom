import {
	AUDIO_PROGRESS,
	SCROLL_PROGRESS,
	AUDIO_PLAYING
} from '~/model/constants'

export const state = () => ({
	audioPlaying: false,
	audioProgress: 0,
	scrollProgress: 0
})

export const mutations = {
	[AUDIO_PLAYING.mutation](state, data) {
		state.audioPlaying = data
	},
	[AUDIO_PROGRESS.mutation](state, data) {
		state.audioProgress = data
	},
	[SCROLL_PROGRESS.mutation](state, data) {
		state.scrollProgress = data
	}
}

export const actions = {
	[AUDIO_PLAYING.action]({ commit }, data) {
		commit(AUDIO_PLAYING.mutation, data)
	},
	[AUDIO_PROGRESS.action]({ commit }, data) {
		commit(AUDIO_PROGRESS.mutation, data)
	},
	[SCROLL_PROGRESS.action]({ commit }, data) {
		commit(SCROLL_PROGRESS.mutation, data)
	}
}
