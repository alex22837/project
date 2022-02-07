import { set, ref, getDatabase } from 'firebase/database'
export default {
  namespaced: true,
  actions: {
    async setEmail(_, payload) {
      try {
        const db = getDatabase()
        set(ref(db, 'feedback/' + String(Math.random()).split('.')[1]), { email: payload })
      } catch(e) {
        console.log(e.message)
      }
    }
  }
}