import { INIT_PROGRESS, UPDATE_PROGRESS } from '~/model/constants'
import ContentTypes from '~/model/content-types'

/**
 * !TODO: get progressItems from showtcuts, right now it counts unused ones
 */

export const state = () => ({
	progressItems: {},
	progressPct: 0,
	progressMax: 0
})

export const mutations = {
	[INIT_PROGRESS.mutation](state) {
		Object.values(ContentTypes).forEach(({ name, contentScore }) => {
			state.progressItems[name] = {
				complete: false,
				score: contentScore
			}

			state.progressMax += contentScore
		})
	},
	[UPDATE_PROGRESS.mutation](state, name) {
		state.progressItems[name].complete = true

		const totalScore = Object.values(state.progressItems)
			.filter(i => i.complete)
			.reduce((acc, i) => (acc += i.score), 0)

		state.progressPct = Math.round((totalScore / state.progressMax) * 100)
	}
}

export const actions = {
	[INIT_PROGRESS.action]({ commit }) {
		commit(INIT_PROGRESS.mutation)
	},
	[UPDATE_PROGRESS.action]({ commit }, name) {
		commit(UPDATE_PROGRESS.mutation, name)
	}
}
