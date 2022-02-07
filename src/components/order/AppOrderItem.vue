<template>
  <tr class="order-item">
    <td>
      <img 
      :src="product.img" 
      width="100" 
      @click="$router.push(`/products/${product.productId}`)"
      class="order-item-img"
      >
    </td>
    <td>{{ product.productHeader }}</td>
    <td>{{ product.date }}</td>
    <td>{{ currency(product.priceWithSale) }}</td>
    <td>{{ product.sale ? product.sale : '-' }}</td>
    <td>
      {{ product.counter }}
    </td>
    <td>
      {{ currency(total(product.priceWithSale, product.counter)) }}
    </td>
  </tr>
</template>

<script>
import { total } from '../../util/total'
import { currency } from '../../util/currency'
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup() {
    return { total, currency }
  }
}
</script>