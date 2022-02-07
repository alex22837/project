<template>
  <app-loader v-if="loader"></app-loader>
  <app-wrapper v-else-if="productsCateg && activeIndex && filterProducts && footer">
    <div class="products-fliter mt-4">
      <app-search
        v-model="filterValue"
        :products="filterProducts"
      ></app-search>
      <app-filter 
        :flag="isOpen"
        @changeFlag="change"
      ></app-filter>
    </div>
    <div class="products row mb-5 me-0">
      <div 
      :class="{
        'products-nav': true, 
        'col-2': !isOpen, 
        'col-0': isOpen, 
        'd-none': isOpen
      }">
        <app-nav
          :productsCateg="productsCateg"
          :activeIndex="activeIndex.name"
          :productsFilterArr="productsFilterArr"
          :activeIndexFilter="activeIndexFilter.name"
          :isOpen="isOpen"
          @updateFilter="updateFilter"
          @updateCat="update"
        ></app-nav>
      </div>
      <div
        :class="{
          'products-content':true, 
          'col-10': !isOpen, 
          'col-12': isOpen, 
          'row': true, 
          'pe-0': true
        }">
        <app-content
          v-if="filterProducts.length ? true : false"
          :filterProducts="filterProducts"
          :isOpen="isOpen"
          :user="user"
        ></app-content>
        <app-no-matches
          v-else
          :message="{
            title: 'Ничего не найдено',
            descr: 'Попробуйте изменить фильтры или'
          }"
          @resetFilters="filterValue = ''"
        ></app-no-matches>
      </div>
    </div>
    <app-footer :footer="footer"></app-footer>
  </app-wrapper>
</template>

<script>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '../components/AppLoader.vue'
import AppWrapper from '../ui/AppWrapper.vue'
import AppSearch from '../components/products/AppSearch.vue'
import AppFilter from '../components/products/AppFilter.vue'
import AppNav from '../components/products/AppNav.vue'
import AppContent from '../components/products/AppContent.vue'
import AppNoMatches from '../components/products/AppNoMatches.vue'
import AppFooter from '../components/home/AppFooter.vue'

import { filterToPrice } from '../util/filterToPrice'

export default {
  components: { 
    AppLoader, 
    AppWrapper, 
    AppSearch, 
    AppFilter, 
    AppNav, 
    AppContent, 
    AppNoMatches,
    AppFooter
  },
  setup() {
    const store = useStore()

    onBeforeMount(async () => {
      store.commit('loader/setLoader')
      if (!store.getters['productCateg/isCateg'])
        await store.dispatch('productsCateg/getCateg')
      if (!store.getters['footer/isFooter'])
        await store.dispatch('footer/getFooter')
      store.commit('loader/setLoader')
    })

    const productsFilterArr = [
      { name: 'Цена: свой порядок', value: 0 },
      { name: 'Цена: по возрастанию', value: 1 },
      { name: 'Цена: по убыванию', value: -1 }
    ]

    const activeIndex = ref()
    const activeIndexFilter = ref()
    const isOpen = ref(false)
    const filterValue = ref()

    const loader = computed(() => {
      return store.getters['loader/getLoader']
    })

    const products = computed(() => {
      return store.getters['product/getProducts']
    })

    const productsCateg = computed(() => {
      return store.getters['productsCateg/getCateg']
    })

    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    const footer = computed(() => {
      return store.getters['footer/getFooter']
    })

    const filterProducts = computed(() => {
      if (activeIndexFilter.value.value && filterValue.value) {
        return products.value.sort(filterToPrice('priceWithSale', activeIndexFilter.value.value)).filter(e => e.header.toLowerCase().includes(filterValue.value.toLowerCase()))
      } else if (filterValue.value) {
        return products.value.filter(e => e.header.toLowerCase().includes(filterValue.value.toLowerCase()))
      } else if (activeIndexFilter.value.value) {
        return products.value.filter(e => e.categ === activeIndex.value.name).sort(filterToPrice('priceWithSale', activeIndexFilter.value.value))
      } else {
        return products.value.filter(e => e.categ === activeIndex.value.name)
      }
    })

    const update = data => {
      activeIndex.value = data
    }

    const updateFilter = data => {
      typeof data === 'string' ? activeIndexFilter.value = { name: data } : activeIndexFilter.value = { ...data }
    }

    const change = () => isOpen.value = !isOpen.value

    watch(productsCateg, val => {
      activeIndex.value = productsCateg.value[0]
      activeIndexFilter.value = productsFilterArr[0]
    })

    return { 
      loader, 
      products, 
      productsCateg, 
      user,
      activeIndex, 
      update, 
      filterProducts, 
      isOpen,
      change,
      filterToPrice,
      productsFilterArr,
      activeIndexFilter,
      updateFilter,
      filterValue,
      footer
    }
  }
}
</script>