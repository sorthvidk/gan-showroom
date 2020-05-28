import createPersistedState from 'vuex-persistedstate'


export default ({store}) => {
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
		]
    })(store)
  })
}