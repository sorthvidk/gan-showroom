import { FETCH_GREEN_ROOM } from '~/model/constants'
import ContentTypes from '~/model/content-types'

export const state = () => ({
	items: []
})

export const mutations = {
	[FETCH_GREEN_ROOM.mutation](state, data) {
		state.items = data
	}
}

export const actions = {}
