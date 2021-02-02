import { FETCH_SUBTITLES, FETCH_SCROLL_IMAGES } from '~/model/constants'
import { isNotVideo } from './../utils/is-video'

export const state = () => ({
	track: null,
	subtitles: [],
	scrollImages: []
})

export const mutations = {
	[FETCH_SUBTITLES.mutation](state, data) {
		state.subtitles = data.sort((a, b) => (a.time < b.time ? -1 : 1))
	},
	[FETCH_SCROLL_IMAGES.mutation](state, data) {
		state.scrollImages = data.filter(x => isNotVideo(x.cloudinaryUrl))
	}
}

export const actions = {}
