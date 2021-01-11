import {
	AUDIO_TRACK,
	AUDIO_PROGRESS,
	SCROLL_PROGRESS,
	AUDIO_IS_PLAYING,
	AUDIO_SCROLLABLE,
	IS_INTRO,
	FETCH_SUBTITLES,
	AUDIO_DURATION,
	FETCH_SCROLL_IMAGES,
	GALLERY_IS_PLAYING
} from '~/model/constants'
import { isNotVideo } from './../utils/is-video'

export const state = () => ({
	track: null,
	subtitles: [],
	scrollImages: []
	// audioIsPlaying: true,
	// audioProgress: 0,
	// audioDuration: 0,
	// scrollProgress: 0,
	// audioIsScrollable: false,
	// isIntro: true,
	// galleryIsPlaying: false
})

export const mutations = {
	// [AUDIO_TRACK.mutation](state, data) {
	// 	state.track = data
	// },
	// [AUDIO_IS_PLAYING.mutation](state, data) {
	// 	state.audioIsPlaying = data
	// },
	[FETCH_SUBTITLES.mutation](state, data) {
		state.subtitles = data.sort((a, b) => (a.time < b.time ? -1 : 1))
	},
	[FETCH_SCROLL_IMAGES.mutation](state, data) {
		state.scrollImages = data.filter(x => isNotVideo(x.cloudinaryUrl))
	}
	// [AUDIO_PROGRESS.mutation](state, data) {
	// 	state.audioProgress = data
	// },
	// [SCROLL_PROGRESS.mutation](state, data) {
	// 	state.scrollProgress = data
	// },
	// [AUDIO_DURATION.mutation](state, data) {
	// 	state.audioDuration = data
	// },
	// [AUDIO_SCROLLABLE.mutation](state, data) {
	// 	state.audioIsScrollable = data
	// },
	// [IS_INTRO.mutation](state) {
	// 	state.isIntro = false
	// }
	// [GALLERY_IS_PLAYING.mutation](state, data) {
	// 	state.galleryIsPlaying = data
	// }
}

export const actions = {
	// [AUDIO_TRACK.action]({ commit }, data) {
	// 	commit(AUDIO_TRACK.mutation, data)
	// },
	// [AUDIO_IS_PLAYING.action]({ commit }, data) {
	// 	commit(AUDIO_IS_PLAYING.mutation, data)
	// },
	// [AUDIO_PROGRESS.action]({ commit }, data) {
	// 	commit(AUDIO_PROGRESS.mutation, data)
	// },
	// [AUDIO_DURATION.action]({ commit }, data) {
	// 	commit(AUDIO_DURATION.mutation, data)
	// },
	// [SCROLL_PROGRESS.action]({ commit }, data) {
	// 	commit(SCROLL_PROGRESS.mutation, data)
	// },
	// [AUDIO_SCROLLABLE.action]({ commit }, data) {
	// 	commit(AUDIO_SCROLLABLE.mutation, data)
	// },
	// [IS_INTRO.action]({ commit }) {
	// 	commit(IS_INTRO.mutation)
	// }
	// [GALLERY_IS_PLAYING.action]({ commit }, data) {
	// 	commit(GALLERY_IS_PLAYING.mutation, data)
	// }
}
