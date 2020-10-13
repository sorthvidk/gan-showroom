import { nextIndex, prevIndex } from '~/utils/array-helpers'

export const state = () => ({
	curIndex: 0,
	images: ['/img/puzzle/one.jpg', '/img/puzzle/two.jpg']
})

export const mutations = {
	next: state => (state.curIndex = nextIndex(state.images, state.curIndex)),
	prev: state => (state.curIndex = prevIndex(state.images, state.curIndex))
}

export const actions = {
	next: ({ commit }) => commit('next'),
	prev: ({ commit }) => commit('prev')
}
