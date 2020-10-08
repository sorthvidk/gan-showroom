import { ASSISTANT_TEXT } from '~/model/constants'

export const state = () => ({
	customText: {
		headline: '',
		bodyText: ''
	}
})

export const mutations = {
	[ASSISTANT_TEXT.mutation](state, { headline, bodyText }) {
		state.customText.headline = headline
		state.customText.bodyText = bodyText
	}
}

export const actions = {
	[ASSISTANT_TEXT.action]({ commit }, data) {
		console.log(data)
		commit(ASSISTANT_TEXT.mutation, data)
	}
}
