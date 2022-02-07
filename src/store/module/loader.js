export default {
  namespaced: true,
  state: {
    loader: null
  },
  getters: {
    getLoader(state) {
      return state.loader
    }
  },
  mutations: {
    setLoader(state) {
      state.loader = !state.loader
    }
  }
}