<template>
  <div class="container">
    <div class="product-cat">
      <div class="product-cat-header d-flex flex-column">
        <app-product-header :category="category" :header="header"></app-product-header>
      </div>
      <div class="product-cat-hamburger">
        <app-product-hamburger :category="category" v-model="categ"></app-product-hamburger>
      </div>
      <div class="product-cat-content">
        <app-product-content :categ="categ" :products="products" :user="user"></app-product-content>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import AppProductHeader from './catProduct/AppProductHeader.vue'
import AppProductHamburger from './catProduct/AppProductHamburger.vue'
import AppProductContent from './catProduct/AppProductContent.vue'

export default {
  components: { 
    AppProductHeader,
    AppProductHamburger,
    AppProductContent
  },
  props: {
    categ: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      required: true
    },
    category: {
      type: Array,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const categ = ref(props.categ)

    watch(categ, value => emit('update:modelValue', value))

    return { categ }
  }
}
</script>