<template>
  <app-loader v-if="loader"></app-loader>
  <app-wrapper v-else-if="products && advantages && category && categ && storehouse && footer">

      <app-features 
        :product="products.filter(e => e.header === 'momieq')
          .reduce((acc, el) => ({ ...acc, ...el }), {})"
      ></app-features>

      <app-some-product 
        :products="products"
      ></app-some-product>

      <app-bigSale 
        :products="products"
      ></app-bigSale>

      <app-advantages 
        :advantages="advantages" 
      ></app-advantages>

      <app-product-cat
        :categ="categ"
        :category="category" 
        :products="products" 
        :header="header"
        :user="user"
        v-model="categ"
      ></app-product-cat>
      <app-product-storehouse
        :storehouse="storehouse" 
        :user="user"
        :products="products"
      ></app-product-storehouse>

      <app-feedback></app-feedback>

      <app-footer
        :footer="footer"
      ></app-footer>

  </app-wrapper>
</template>

<script>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '../components/AppLoader.vue'
import AppWrapper from '../ui/AppWrapper.vue'
import AppFeatures from '../components/home/features.vue'
import AppSomeProduct from '../components/home/someProduct.vue'
import AppBigSale from '../components/home/AppBigSale.vue'
import AppAdvantages from '../components/home/AppAdvantages.vue'
import AppProductCat from '../components/home/AppProductCategory.vue'
import AppProductStorehouse from '../components/home/AppProductStorehouse.vue'
import AppFeedback from '../components/home/AppFeedback.vue'
import AppFooter from '../components/home/AppFooter.vue'

import { changeCat } from '../use/productCat'

export default {
  components: {
    AppLoader,
    AppWrapper,
    AppFeatures,
    AppSomeProduct,
    AppBigSale,
    AppAdvantages,
    AppProductCat,
    AppProductStorehouse,
    AppFeedback,
    AppFooter
  },
  setup() {
    const loader = computed(() => {
      return store.getters['loader/getLoader']
    })
    const store = useStore()
    const categ = ref()
    const header = ref()

    onBeforeMount(async () => {
      store.commit('loader/setLoader')
      if (!store.getters['advantages/isAdvantages'])
        await store.dispatch('advantages/getAdvantages')
      if (!store.getters['category/isCategory'])
        await store.dispatch('category/getCategory')
      if (!store.getters['storehouse/isStorehouse'])
        await store.dispatch('storehouse/getStorehouse')
      if (!store.getters['footer/isFooter'])
        await store.dispatch('footer/getFooter')
      categ.value = category.value[0].name
      store.commit('loader/setLoader')
    })

    const products = computed(() => {
      return store.getters['product/getProducts']
    })

    const advantages = computed(() => {
      return store.getters['advantages/getAdvantages']
    })

    const category = computed(() => {
      return store.getters['category/getCategory']
    })

    const storehouse = computed(() => {
      return store.getters['storehouse/getStorehouse']
    })

    const footer = computed(() => {
      return store.getters['footer/getFooter']
    })

    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    watch(categ, value => {
      categ.value = value
      header.value = category.value.filter(e => e.name === value)[0].value
    })

    return { 
      products, 
      advantages, 
      category, 
      changeCat, 
      categ, 
      header, 
      storehouse, 
      footer, 
      loader,
      user
    }
  }
}
</script>