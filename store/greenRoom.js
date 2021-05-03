import { FETCH_GREEN_ROOM } from '~/model/constants'

export const state = () => ({
	items: []
})

export const mutations = {
	[FETCH_GREEN_ROOM.mutation](state, data) {
		state.items = data.sort((a, b) => (a.order > b.order ? 1 : -1))
	}
}

export const actions = {}
