<template>
  <div class="row d-flex dlex-row justify-content-between" v-if="products">
    <div class="col-6 d-flex flex-row py-4 big-sale-block" v-for="product of products.filter(e => e.header === 'Canon XA45' || e.header === 'DJI Mini 2')" :key="product.id">
      <div class="col-6 flex-column d-flex align-self-center">
        <span class="big-sale-sale">Скидка {{ product.sale }}% только сегодня!</span>
        <h3 class="big-sale-header">{{ product.header }}</h3>
        <router-link :to="`/products/${product.id}`" class="big-sale-link">Показать</router-link>
      </div>
      <div class="col-6 d-flex align-self-center">
        <router-link :to="`/products/${product.id}`">
          <img :src="product.img" width="240" class="big-sale-img">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const products = computed(() => {
      return store.getters['product/getProducts']
    })

    return { products }
  }
}
</script>