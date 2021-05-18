import createPersistedState from 'vuex-persistedstate'
import manifest from '../package.json'

export default ({ store }) => {
	window.onNuxtReady(() => {
		createPersistedState({
			key: `gannishowroom${manifest.version.replace(/\./g, '_')}`,
			paths: [
				'user.loggedIn',
				'user.hasAuthenticated',
				'user.cookiesAccepted',
				'user.copyrightAccepted',
				'user.hasDoneQuiz',
				// 'progressBar.progressItems',
				// 'progressBar.progressPct',
				'collection.wishList'
			],
			rehydrated: store => {
				/* Doesn't run on first page load */
			},
			assertStorage: () => store.commit('rehydrated')
		})(store)
	})
}
