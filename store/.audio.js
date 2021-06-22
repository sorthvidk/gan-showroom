import { FETCH_SUBTITLES, FETCH_SCROLL_IMAGES } from '~/model/constants'
import { isNotVideo } from '../utils/is-video.js'

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
		state.scrollImages = data.filter(x => {
			const url = Array.isArray(x.cloudinaryUrl)
				? x.cloudinaryUrl[0]
				: x.cloudinaryUrl
			return isNotVideo(url)
		})
	}
}

export const actions = {}
