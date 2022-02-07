export default {
  namespaced: true,
  state: {
    alert: false
  },
  getters: {
    getAlert(state) {
      return state.alert
    }
  },
  mutations: {  
    setAlert(state, payload) {
      state.alert = payload
    },
    closeAlert(state) {
      state.alert = false
    }
  }
}