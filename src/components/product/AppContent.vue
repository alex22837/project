<template>
  <div class="d-flex align-items-center row">
    <div class="product-img col-3">
      <img :src="product.img" width="260">
    </div>
    <div class="product-descr col-9">
      <h2>{{ product.header }}</h2>
      <p v-for="descr of product.descr" :key="descr">{{ descr }}</p>
      <button class="btn-buy" @click="buyProduct">Купить</button>
      <span>{{ currency(priceWithSale(product.price, product.sale)) }}/<s>{{ currency(product.price) }}</s></span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { priceWithSale } from '../../util/priceWithSale'
import { currency } from '../../util/currency'

export default {
  props: {
    product: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: false,
      default: false
    }
  },
  emits: ['buyProduct'],
  setup(props, { emit }) {
    const product = computed(() => {
      return props.product.reduce((acc, el) => ({ ...acc, ...el }), {})
    })

    const buyProduct = () => emit('buyProduct', product)

    return { priceWithSale, currency, product, buyProduct }
  }
}
</script>