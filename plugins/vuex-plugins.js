import createPersistedState from 'vuex-persistedstate'


export default ({store}) => {
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
		]
    })(store)
  })
}