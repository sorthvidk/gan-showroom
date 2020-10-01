import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
	window.onNuxtReady(() => {
		createPersistedState({
			key: 'gannishowroom',
			paths: [
				'user.loggedIn',
				'user.cookiesAccepted',
				'user.copyrightAccepted',
				'progressBar.progressItems',
				'progressBar.progressMax',
				'progressBar.progressPct',
				'collection.wishList'
			],
			rehydrated: store => {
				/* Doesn't run on first page load */
			},
			assertStorage: () => store.commit('rehydrated')
		})(store)
	})
}
