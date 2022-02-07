<template>
  <div class="row">
    <div class="col-6 pe-0 d-flex align-items-center justify-content-between" v-for="product of products.filter(e => e.header === 'Наушники' || e.header === 'Колонка')" :key="product.id">
      <div class="row">
        <div class="col-5 ps-0 some-product-img">
          <router-link :to="`/products/${product.id}`">
            <img class="some-product-img-logo" src="../../../img/cart.png">
            <img :src="product.img" class="some-product-img-img col-12">
          </router-link>
        </div>
        <div class="col-7 pe-0 d-flex flex-column align-items-start justify-content-center pe-3 some-product-text">
          <h3 class="some-product-header">{{ product.header }}</h3>
          <p class="some-product-descr">{{ product.descr[0] }}</p>
          <span class="some-product-price">{{ currency(priceWithSale(product.price, product.sale)) }}/<s class="some-product-strike">{{ currency(product.price) }}</s></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { priceWithSale } from '../../../util/priceWithSale'
import { currency } from '../../../util/currency'

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup() {
    return { 
      priceWithSale,
      currency 
    }
  }
}
</script>