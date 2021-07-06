import { FETCH_WARM_UP } from '~/model/constants'

export const state = () => ({
	images: []
})

export const mutations = {
	[FETCH_WARM_UP.mutation](state, data) {
		state.images = data[0].cloudinaryUrl
	}
}

export const actions = {}
