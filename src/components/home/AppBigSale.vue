<template>
  <div class="container">
    <div class="big-sale justify-content-between">
      <app-big-sale-content :products="products"></app-big-sale-content>
    </div>
  </div>
</template>

<script>
import AppBigSaleContent from './bigSale/AppBigSaleContent.vue'

export default {
  components: { AppBigSaleContent },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>