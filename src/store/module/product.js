import { priceWithSale } from '../../util/priceWithSale'
import { update, getDatabase, ref, get, child, onValue } from 'firebase/database'

export default {
  namespaced: true,
  state: {
    products: []
  },
  getters: {
    getProducts(state) {
      return state.products
    },
    isProduct(_, getters) {
      return !!getters.getProducts
    }
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setPriceWithSale(state) {
      for (const item of state.products) {
        item.priceWithSale = priceWithSale(item.price, item.sale)
      }
    }
  },
  actions: {
    async getProduct({commit}) {
      try {
        const dbRef = ref(getDatabase());
        const data = await get(child(dbRef, 'product')).then((snapshot) => {
          if (snapshot.exists()) {
            return snapshot.val()
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })
        const someData = Object.keys(data).map(id => ({ ...data[id], id }))
        commit('setProducts', someData)
        commit('setPriceWithSale')
      } catch(e) {
        console.log(e.message)
      }
    },
    async addProduct(_, { img, header, descr, price, sale, date }) {
      try {
        const db = getDatabase()
        await set(ref(db, `products/${String(Math.random()).split('.')[1]}`), {
          img,
          header,
          descr,
          price,
          sale,
          date
        })
      } catch(e) {
        console.log(e)
      }
    },
    updateProduct({ commit }) {
      const db = getDatabase()
      const starCountRef = ref(db, 'product')
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        const someData = Object.keys(data).map(id => ({ ...data[id], id }))
        commit('setProducts', someData )
        commit('setPriceWithSale')
      });
    },
    async newCounter(_, { userId, productId, val }) {
      const db = getDatabase()
      await update(ref(db, `users/${userId}/basket/${productId}`), { counter: valvue })
    }
  }
}