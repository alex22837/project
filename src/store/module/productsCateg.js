import { getDatabase, ref, child, get } from 'firebase/database'

export default {
  namespaced: true,
  state: {
    categ: null
  },
  getters: {
    getCateg(state) { 
      return state.categ
    },
    isCateg(_, getters) {
      return !!getters.getCateg
    }
  },
  mutations: {
    setCateg(state, payload) {
      state.categ = payload
    }
  },
  actions: {
    async getCateg({ commit }) {
      try {
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'productsCateg')).then((snapshot) => {
          if (snapshot.exists()) {
            commit('setCateg', snapshot.val())
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      } catch(e) {
        console.log(e)
      }
    }
  }
}