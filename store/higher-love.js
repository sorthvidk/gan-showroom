import { FETCH_HIGHER_LOVE } from '~/model/constants'

export const state = () => ({
	content: []
})

export const mutations = {
	[FETCH_HIGHER_LOVE.mutation](state, data) {
		state.content = data
	}
}

export const actions = {}
