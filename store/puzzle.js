import { nextIndex, prevIndex } from '~/utils/array-helpers'
import { PUZZLE_INSTANCE, SAVE_PUZZLE } from '~/model/constants'

export const state = () => ({
	curIndex: 0,
	images: ['/img/puzzle/one.jpg', '/img/puzzle/two.jpg'],
	puzzle: null,
	puzzleState: [...Array(20)]
})

export const mutations = {
	next: state => (state.curIndex = nextIndex(state.images, state.curIndex)),
	prev: state => (state.curIndex = prevIndex(state.images, state.curIndex)),
	[SAVE_PUZZLE.mutation](state, data) {
		state.puzzleState[state.curIndex] = data
	},
	[PUZZLE_INSTANCE.mutation](state, data) {
		state.puzzle = data
	}
}

export const actions = {
	next: ({ commit }) => commit('next'),
	prev: ({ commit }) => commit('prev'),
	[SAVE_PUZZLE.action]({ commit }, data) {
		commit(SAVE_PUZZLE.mutation, data)
	},
	[PUZZLE_INSTANCE.action]({ commit }, data) {
		commit(PUZZLE_INSTANCE.mutation, data)
	}
}
