import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/login',
      component: () => import('../views/Login'),
      meta: { layout: 'login', auth: false } 
    },
    {
      path: '/registration',
      component: () => import('../views/Registration'),
      meta: { layout: 'login', auth: false }
    },
    { 
      path: '/home', 
      component: () => import('../views/Home'), 
      alias: '/', 
      meta: { layout: 'main', auth: false } 
    },
    {
      path: '/products',
      component: () => import('../views/Products'),
      meta: { layout: 'main', auth: false },
    },
    {
      path: '/products/:productId',
      component: () => import('../views/Product'),
      meta: { layout: 'main', auth: false }
    },
    {
      path: '/contact_us',
      component: () => import('../views/ContactUs'),
      meta: { layout: 'main', auth: false }
    },
    {
      path: '/about',
      component: () => import('../views/About'),
      meta: { layout: 'main', auth: false }
    },
    {
      path: '/profile',
      component: () => import('../views/Profile'),
      meta: { layout: 'main', auth: true }
    },
    {
      path: '/basket',
      component: () => import('../views/Basket'),
      meta: { layout: 'main', auth: true }
    },
    {
      path: '/order',
      component: () => import('../views/Order'),
      meta: { layout: 'main', auth: true }
    },
    {
      path: '/desired',
      component: () => import('../views/Desired'),
      meta: { layout: 'main', auth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && store.getters['auth/isToken']) {
    next()
  } else if (to.meta.auth && !store.getters['auth/isToken']) {
    router.push('/login')
  } else {
    next()
  }
})

export default router