import { TOPMOST_WINDOW } from '../store/constants'
console.log('TOPMOST_WINDOW', TOPMOST_WINDOW)

export const state = () => ({
  blogPosts: [],
  windows: [],
  [TOPMOST_WINDOW.stateKey]: null
})

export const mutations = {
  setBlogPosts (state, list) {
    state.blogPosts = list
  },
  [TOPMOST_WINDOW.mutation] (state, payload) {
    console.log('mutation')
    state[TOPMOST_WINDOW.stateKey] = payload
  }
}

export const actions = {
  [TOPMOST_WINDOW.action] ({ commit }, windowId) {
    console.log('action')

    commit(TOPMOST_WINDOW.mutation, windowId)
  },

  async nuxtServerInit ({ commit }) {
    let files = await require.context(
      '~/assets/content/blog/',
      false,
      /\.json$/
    )
    let blogPosts = files.keys().map(key => {
      let res = files(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setBlogPosts', blogPosts)
  }
}
