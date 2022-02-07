import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, ref, set, child, get, onValue, update } from 'firebase/database'
import router from '../../router'
import { error } from '../../util/error'

const TOKEN_KEY = 'jwt-token'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem(TOKEN_KEY),
    user: null
  },
  getters: {
    getToken(state) {
      return state.token
    },
    isToken(_, getters) {
      return !!getters.getToken
    },
    getUser(state) {
      return state.user
    },
    isUser(_, getters) {
      return !!getters.getUser
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    removeToken(state, token) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY, token)
    },
    setUser(state, payload) {
      state.user = payload
    },
    updateBasket(state, { value }) {
      state.user.basket = value
    },
    updateOrders(state, { value }) {
      state.user.order = value
    },
    updateDesired(state, { value }) {
      state.user.desired = value
    },
    logOut(state) {
      state.user = null
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions: {
    async logIn({ commit, dispatch }, payload) {
      try {
        const auth = getAuth()
        const data = await signInWithEmailAndPassword(auth, payload.email, payload.password)
        const dbRef = ref(getDatabase())
        console.log(child(dbRef, `users/${data.user.uid}`))
        get(child(dbRef, `users/${data.user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            commit('setUser', { ...snapshot.val(), uid: data.user.uid })
          } else {
            console.log('Такого пользователя не найдено')
          }
        }).catch((error) => {
          error(error)
        })
        commit('setToken', data.user.uid)
      } catch (e) {
        await dispatch('message/setMessage', { value: error(e.message.split('/')[1].split(')')[0]), type: 'danger' }, { root: true })
        throw new Error(e.message)
      }
    },
    async registration({ dispatch }, payload) {
      try {
        const auth = getAuth()
        const db = getDatabase()
        const data = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
        async function writeUserData(userId, email) {
          set(ref(db, 'users/' + userId), {
            email: email
          })
        }
        await writeUserData(data.user.uid, data.user.email)
        // dispatch('message/setMessage', { value: 'Вы успешно зарегестрировались', type: 'primary' }, { root: true })
      } catch (e) {
        dispatch('message/setMessage', { value: 'ahahha', type: 'danger' }, { root: true })
      }
    },
    async updateUser({ commit }, userId) {
      const db = getDatabase()
      const starCountRef = ref(db, 'users/' + userId + '/basket')
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        commit('updateBasket', { value: data })
      })
    },
    async loadUser({ commit }, payload) {
      const dbRef = ref(getDatabase())
      get(child(dbRef, `users/${payload}`)).then((snapshot) => {
        if (snapshot.exists()) {
          commit('setUser', { ...snapshot.val(), uid: payload })
        } else {
          console.log('No data available')
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    async remove(_, { userId, productHeader }) {
      try {
        const db = getDatabase()
        set(ref(db, 'users/' + userId + '/basket/' + productHeader), null)
      } catch(e) {
        console.log(e.message)
      }
    },
    async logOut({ commit }) {
      try {
        const auth = getAuth()
        signOut(auth).then(() => {
          commit('logOut')
          router.push('/')
        }).catch((error) => {
          console.log(error)
        })
      } catch(e) {
        console.log(e.message)
      }
    },
    async createOrder({ dispatch }, { userId, productId, priceWithSale, counter, totalCost, productHeader, price, sale, img}) {
      try {
        const db = getDatabase()
        const idOrder = String(Math.random()).split('.')[1]
        await set(ref(db, 'order/' + idOrder), {
          userId,
          productId,
          priceWithSale,
          counter,
          totalCost,
          productHeader
        })
        await set(ref(db, 'users/' + userId + '/order/' + idOrder), {
          productId,
          price,
          sale,
          img,
          priceWithSale,
          counter,
          totalCost,
          productHeader,
          date: new Date().toLocaleString('ru-RU').split(',')[0]
        })
        await set(ref(db, 'users/' + userId + '/basket/' + productHeader), null)
        dispatch('message/setMessage', { value: 'Оплата прошла успешно', type: 'primary' }, { root: true })
      } catch(e) {
        console.log(e.message)
      }
    },
    async removeOrder(_, { idOrder, productHeader, userId }) {
      const db = getDatabase()
      set(ref(db, 'order/' + idOrder), null) 
      update(ref(db, 'users/' + userId + '/basket/' + productHeader), { 
        buy: null, 
        idOrder: null
      })
    },
    updateOrders({ commit }, userId) {
      try {
        const db = getDatabase()
        const starCountRef = ref(db, 'users/' + userId + '/order')
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val()
          commit('updateOrders', { value: data })
        })
      } catch (e) {
        console.log(e.message)
      }
    },
    async createDesired({ getters }, payload) {
      const db = getDatabase()
      const userId = getters['getUser'].uid
      set(ref(db, 'users/' + userId + '/desired/' + payload.productHeader) ,{
        productId: payload.productId
      })
    },
    async removeDesired({ getters }, payload) {
      const db = getDatabase()
      const userId = getters['getUser'].uid
      set(ref(db, 'users/' + userId + '/desired/' + payload.productHeader), null)
    },
    async updateDesired({ commit }, userId) {
      const db = getDatabase()
      const starCountRef = ref(db, 'users/' + userId + '/desired')
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        commit('updateDesired', { value: data })
      })
    }
  }
}