import AssistantModes from '~/model/assistant-modes'
import {
	ASSISTANT_UPDATE,
	FETCH_ASSISTANT,
	ASSISTANT_TEXT,
	ASSISTANT_MODE,
	ASSISTANT_EXPANDED,
	ASSISTANT_TOGGLE
} from '~/model/constants'

export const state = () => ({
	texts: {},
	expanded: true,
	closed: false,
	assistantMode: AssistantModes.WELCOME,
	pdfDownloadLink:
		'//pdfcrowd.com/url_to_pdf/?pdf_name=ganni-space-export&width=210mm&height=297mm&hmargin=0mm&vmargin=0mm',
	customText: {
		headline: '',
		bodyText: ''
	}
})

export const getters = {
	viewWishListButtonLabel: (state, getters, rootState) =>
		`View wishlist (${rootState.collection.wishList.length})`
}

export const mutations = {
	[FETCH_ASSISTANT.mutation](state, data) {
		/**
		 * [itemId]: {
		 *   headline: 'foo',
		 *   bodyText: 'bar'
		 * }
		 */
		state.texts = data.reduce((acc, cur) => {
			acc[cur.itemId] = { ...cur }
			return acc
		}, {})
	},

	[ASSISTANT_EXPANDED.mutation](state, data) {
		state.expanded = data
	},

	[ASSISTANT_TOGGLE.mutation](state, data) {
		state.closed = data
	},

	[ASSISTANT_TEXT.mutation](state, data) {
		/**
		 * can either be an object with { headline, bodyText },
		 * or a string with a reference to cms/assistant/itemId
		 */
		state.customText = data
	},

	[ASSISTANT_MODE.mutation](state, data) {
		state.assistantMode = data
	}
}

export const actions = {
	[ASSISTANT_EXPANDED.action]({ commit }, data) {
		commit(ASSISTANT_EXPANDED.mutation, data)
	},

	[ASSISTANT_TOGGLE.action]({ commit }, data) {
		commit(ASSISTANT_TOGGLE.mutation, data)
	},

	[ASSISTANT_TEXT.action]({ commit }, data) {
		commit(ASSISTANT_TEXT.mutation, data)
	},

	[ASSISTANT_MODE.action]({ commit }, data) {
		commit(ASSISTANT_MODE.mutation, data)
	},

	[ASSISTANT_UPDATE.action]({ commit, rootState }, data) {
		commit(ASSISTANT_TOGGLE.mutation, false)

		if (rootState.windowList.length) {
			if (
				rootState.topMostWindow &&
				rootState.topMostWindow.contentComponentProps.asset &&
				rootState.topMostWindow.contentComponentProps.asset.styleId
			) {
				commit(ASSISTANT_MODE.mutation, AssistantModes.STYLE_DETAILS)
			} else if (rootState.topMostWindow.assistant) {
				commit(ASSISTANT_MODE.mutation, rootState.topMostWindow.assistant.mode)
				commit(ASSISTANT_TEXT.mutation, rootState.topMostWindow.assistant.text)
			} else {
				commit(ASSISTANT_MODE.mutation, AssistantModes.WELCOME)
			}
		} else {
			if (rootState.dashboardContent.assistant) {
				commit(
					ASSISTANT_MODE.mutation,
					rootState.dashboardContent.assistant.mode
				)
				commit(
					ASSISTANT_TEXT.mutation,
					rootState.dashboardContent.assistant.text
				)
			} else {
				commit(ASSISTANT_MODE.mutation, AssistantModes.WELCOME)
			}
		}
	}
}
