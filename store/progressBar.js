import { INIT_PROGRESS } from '~/model/constants'
import ContentTypes from '~/model/content-types'

export const state = () => ({
	progressItems: {},
	progressPct: 0,
	progressMax: 0
})

export const mutations = {
	/*
	 *	Activate content block, opens window with matching contentComponent
	 *
	 */
	[INIT_PROGRESS.mutation](state) {
		Object.keys(ContentTypes).forEach(type => {
			state.progressItems[type] = false
		})

		Object.keys(ContentTypes).forEach(type => {
			state.progressItems[type] = {
				complete: false,
				score: ContentTypes[type].contentScore
			}
		})

		let pIA = Object.entries(state.progressItems)
		let pIL = pIA.length
		let pM = 0
		for (let [key, value] of pIA) {
			pM += value.score
		}
		state.progressMax = pM

		// if ( window.GS_LOGS ) console.warn('INIT_PROGRESS', state.progressItems)
		state.progressPct = 0
	}
}

export const actions = {
	[INIT_PROGRESS.action]({ commit }) {
		commit(INIT_PROGRESS.mutation)
	}
}
