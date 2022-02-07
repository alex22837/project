<template>
  <div>
    <span
      class="product-cat-price">
      {{ currency(priceWithSale(price, sale)) }}/
      <s>{{ currency(price) }}</s>
    </span><br>
    <!-- <span class="product-cat-rating">Rating: </span> -->
  </div>
</template>

<script>
import { priceWithSale } from '../../util/priceWithSale'
import { currency } from '../../util/currency'

export default {
  props: {
    price: {
      type: Number,
      required: true
    },
    sale: {
      type: Number,
      required: true
    }
  },
  setup() {
    return { priceWithSale, currency }
  }
}
</script>