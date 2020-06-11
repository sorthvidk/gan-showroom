import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
	window.onNuxtReady(() => {
		createPersistedState({
			key: 'gannishowroom',
			paths: [
				'loggedIn',
				'cookiesAccepted',
				'progressItems',
				'progressMax',
				'progressPct',
				'collection.wishList'
			],
			rehydrated: store => {
				/* Doesn't run on first page load */
			},
			assertStorage: () => store.commit('rehydrated')
		})(store)
	})
}
