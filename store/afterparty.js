import { FETCH_AFTERPARTY } from '~/model/constants'
// import { isVideo } from '~/utils/is-video'

export const state = () => ({
	items: []
})

export const mutations = {
	[FETCH_AFTERPARTY.mutation](state, data) {
		state.items = data
	}
}

export const actions = {}
