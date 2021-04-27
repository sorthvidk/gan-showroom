import { FETCH_FABRICS } from '~/model/constants'

export const state = () => ({
	items: []
})

export const mutations = {
	[FETCH_FABRICS.mutation](state, data) {
		state.items = data
	}
}

export const actions = {}
