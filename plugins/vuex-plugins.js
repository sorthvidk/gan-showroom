import createPersistedState from 'vuex-persistedstate'
import manifest from '../package.json'

export default ({ store }) => {
	window.onNuxtReady(() => {
		createPersistedState({
			key: `gannishowroom${manifest.version.replace(/\./g, '_')}`,
			paths: [
				'user.loggedIn',
				'user.passwordUsed',
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
