export default {
  namespaced: true,
  state: {
    message: null
  },
  getters: {
    getMessage(state) {
      return state.message
    }
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload
    },
    removeMessage(state) {
      state.message = null
    }
  },
  actions: {
    async setMessage({ commit }, payload) {
      commit('setMessage', payload)
      setTimeout(() => commit('removeMessage'), 5000)
    }
  }
}