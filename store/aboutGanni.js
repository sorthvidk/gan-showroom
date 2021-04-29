import { FETCH_ABOUT_GANNI } from '~/model/constants'
import ContentTypes from '~/model/content-types'

export const state = () => ({
	items: []
})

export const mutations = {
	[FETCH_ABOUT_GANNI.mutation](state, data) {
		state.items = data.sort((a, b) => a.id.localeCompare(b.id))
		// state.items = data
	}
}

export const actions = {}
