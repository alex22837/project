<template>
  <div class="container">
    <div class="product-storehouse">
      <div class="product-storehouse-header tac">
        <app-header :storehouse="storehouse"></app-header>
      </div>
      <div class="product-storehouse-content">
        <app-content :products="products" :user="user"></app-content>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './storehouse/AppProductStorehouseHeader.vue'
import AppContent from './storehouse/AppProductStorehouseContent.vue'

export default {
  components: { AppHeader, AppContent },
  props: {
    storehouse: {
      type: Object,
      required: true
    },
    products: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: false
    }
  }
}
</script>