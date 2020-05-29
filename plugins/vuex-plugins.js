import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
	window.onNuxtReady(() => {
		createPersistedState({
			key: 'gannishowroom',
			paths: [
				'loggedIn',
				'wallpaperIndex',
				'cookiesAccepted',
				'progressItems',
				'progressMax',
				'progressPct',
				'collection.wishList'
			],
			rehydrated: store => (store.state.rehydrated = true)
		})(store)
	})
}
