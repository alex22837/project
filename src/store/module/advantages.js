import { get, ref, getDatabase, child } from 'firebase/database'

export default {
  namespaced: true,
  state: {
    advantages: null
  },
  getters: {
    getAdvantages(state) {
      return state.advantages
    },
    isAdvantages(_, getters) {
      return !!getters.getAdvantages
    }
  },
  mutations: {
    setAdvantages(state, payload) {
      state.advantages = payload
    }
  },
  actions: {
    async getAdvantages({ commit }) {
      try {
        const dbRef = ref(getDatabase());
        const data = await get(child(dbRef, 'advantages')).then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val()
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })
        commit('setAdvantages', {...data})
      } catch(e) {
        console.log(e.message)
      }
    }
  }
}