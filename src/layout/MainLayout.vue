<template>
  <the-navbar></the-navbar>
  <router-view></router-view>
</template>

<script>
import { onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'
import TheNavbar from '../components/TheNavbar.vue'

export default {
  components: {TheNavbar},
  setup() {
    const store = useStore()

    onBeforeMount(async () => {
      store.commit('loader/setLoader')
      if (store.getters['product/isProduct'])
        await store.dispatch('product/updateProduct')
      if (localStorage.getItem('jwt-token') && !store.getters['auth/isUser'])
        await store.dispatch('auth/loadUser', localStorage.getItem('jwt-token')) 
      store.commit('loader/setLoader')
    })

    onMounted( async() => {
      const interval = setInterval(() => {
        if (localStorage.getItem('jwt-token') && store.getters['auth/isUser']) {
          store.dispatch('auth/updateUser', localStorage.getItem('jwt-token'))
          store.dispatch('auth/updateOrders', localStorage.getItem('jwt-token'))
          store.dispatch('auth/updateDesired', localStorage.getItem('jwt-token'))
          clearInterval(interval)
        }
      }, 200)
      
    })
  }
}
</script>