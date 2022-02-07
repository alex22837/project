import { createStore } from 'vuex'
import product from './module/product'
import advantages from './module/advantages'
import category from './module/category'
import storehouse from './module/storehouse'
import about from './module/about'
import feedback from './module/feedback'
import loader from './module/loader'
import productsCateg from './module/productsCateg'
import alert from './module/alert'
import auth from './module/auth'
import message from './module/message'
import footer from './module/footer'


export default createStore({
  modules: {
    product,
    advantages,
    category,
    storehouse,
    about,
    feedback,
    loader,
    productsCateg,
    alert,
    auth,
    message,
    footer
  }
})