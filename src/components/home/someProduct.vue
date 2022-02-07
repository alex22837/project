<template>
  <div class="container">
    <div class="some-product">
      <app-product :products="products"></app-product>
    </div>
  </div>
</template>

<script>
import AppProduct from './someProduct/AppProduct.vue'

export default {
  components: { AppProduct },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>
