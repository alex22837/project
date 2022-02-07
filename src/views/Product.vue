<template>
  <app-loader v-if="loader"></app-loader>
  <app-wrapper :container="true" v-else-if="product">
    <div class="product">
      <app-content :product="product" v-if="product" :user="user" @buyProduct="buyProduct"></app-content>
    </div>
  </app-wrapper>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { buy } from '../util/buy'
import AppLoader from '../components/AppLoader.vue'
import AppWrapper from '../ui/AppWrapper.vue'
import AppContent from '../components/product/AppContent.vue'

export default {
  components: { AppLoader, AppWrapper, AppContent },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const loader = computed(() => {
      return store.getters['loader/getLoader']
    })

    const products = computed(() => {
      return store.getters['product/getProducts']
    })

    const product = computed(() => {
      return products.value.filter(e => e.id === route.params.productId)
    })

    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    const buyProduct = product => {
      if (!user.value) {
        store.dispatch('message/setMessage', { type: 'warning', value: 'Вы не зарегестрированны' })
        router.push('/login')
      } else if (user.value.basket && user.value.basket[product.value.header]) {
        buy(
          user.value.uid, 
          { 
            price: product.value.price, 
            sale: product.value.sale, 
            header: product.value.header, 
            img: product.value.img, 
            productId: product.value.id 
          }, 
          user.value.basket[product.value.header].counter
          )
      } else {
        buy(
          user.value.uid, 
          { 
            price: product.value.price, 
            sale: product.value.sale, 
            header: product.value.header, 
            img: product.value.img,
            productId: product.value.id
          }
          )
      }
    }

    return { product, user, loader, buyProduct }
  }
}
</script>