import { get, getDatabase, ref, child } from 'firebase/database'

export default {
  namespaced: true,
  state: {
    footer: null
  },
  getters: {
    getFooter(state) {
      return state.footer
    },
    isFooter(_, getters) {
      return !!getters.getFooter
    }
  },
  mutations: {
    setFooter(state, payload) {
      state.footer = payload
    }
  },
  actions: {
    getFooter({ commit }) {
      const db = ref(getDatabase())
      get(child(db, 'footer'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            commit('setFooter', snapshot.val())
          } else {
            console.log('no data')
          }
        })
        .catch((e) => {
          console.log(e.message)
        })
    }
  }
}