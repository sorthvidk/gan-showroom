import AssistantModes from '~/model/assistant-modes'
import { ASSISTANT_TEXT, ASSISTANT_MODE } from '~/model/constants'

export const state = () => ({
	assistantMode: AssistantModes.WELCOME,
	customText: {
		headline: '',
		bodyText: ''
	}
})

export const mutations = {
	[ASSISTANT_TEXT.mutation](state, { headline, bodyText }) {
		state.customText.headline = headline
		state.customText.bodyText = bodyText
	},
	[ASSISTANT_MODE.mutation](state, data) {
		state.assistantMode = data
	}
}

export const actions = {
	[ASSISTANT_TEXT.action]({ commit }, data) {
		commit(ASSISTANT_TEXT.mutation, data)
	},
	[ASSISTANT_MODE.action]({ commit }, data) {
		commit(ASSISTANT_MODE.mutation, data)
	}
}
