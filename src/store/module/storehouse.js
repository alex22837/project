import { get, ref, child, getDatabase } from 'firebase/database'

export default {
  namespaced: true,
  state: {
    storehouse: null
  },
  getters: {
    getStorehouse(state) {
      return state.storehouse
    },
    isStorehouse(_, getters) {
      return !!getters.getStorehouse
    }
  },
  mutations: {
    setStorehouse(state, payload) {
      state.storehouse = payload
    }
  },
  actions: {
    async getStorehouse({ commit }) {
      try {
        const dbRef = ref(getDatabase());
        const data = await get(child(dbRef, 'storehouse')).then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val()
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })
        commit('setStorehouse', data)
      } catch(e) {
        console.log(e.message)
      }
    }
  }
}