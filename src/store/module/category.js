import { ref, getDatabase, child, get } from 'firebase/database'

export default {
  namespaced: true,
  state: {
    category: null
  },
  getters: {
    getCategory(state) {
      return state.category
    },
    isCategory(_, getters) {
      return !!getters.getCategory
    }
  },
  mutations: {
    setCategory(state, payload) {
      state.category = payload
    }
  },
  actions: {
    async getCategory({commit}) {
      try {
        const dbRef = ref(getDatabase());
        const data = await get(child(dbRef, 'category')).then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val()
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })
        commit('setCategory', data)
      } catch(e) {
        console.log(e.message)
      }
    } 
  }
}