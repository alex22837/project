import { get, child, ref, getDatabase, onValue } from 'firebase/database'

export default {
  namespaced: true,
  state: {
    about: null
  },
  getters: {
    getAbout(state) {
      return state.about
    },
    isAbout(state) {
      return !!state.about
    }
  },
  mutations: {
    setAbout(state, payload) {
      state.about = payload
    }
  },
  actions: {
    async getAbout({ commit }) {
      try {
        const dbRef = ref(getDatabase())
        get(child(dbRef, 'about'))
          .then((snapshot) => {
            if (snapshot.exists()) {
              commit('setAbout', snapshot.val())
            } else {
              console.log('No data available')
            }
          })
          .catch((error) => {
            console.error(error)
          })
        
      } catch(e) {
        console.log(e.message)
      }
    },
    async updateAbout({ commit }) {
      try {
        const db = getDatabase()
        const starCountRef = ref(db, 'about')
        onValue(starCountRef, (snapshot) => {
          commit('setAbout', snapshot.val())
        })
      } catch(e) {
        console.log(e.message)
      }
    }
  }
}