<template>
  <tr class="basket-item">
    <td>
      <img 
      :src="product.img" 
      width="100" 
      @click="$router.push(`/products/${product.id}`)"
      class="basket-item-img"
      >
    </td>
    <td>{{ product.header }}</td>
    <td>{{ currency(product.priceWithSale) }} | <s>{{ currency(product.price) }}</s></td>
    <td>{{ product.sale ? product.sale : '-' }}</td>
    <td>
      <button @click="$router.push(`/products/${product.id}`)" class="btn btn-primary">К покупке</button>
      <button @click="removeDesired" class="btn btn-danger ms-3">Удалить</button>
    </td>
  </tr>
</template>

<script>
import { currency } from '../../util/currency'

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  emits: ['removeDesired'],
  setup(props, { emit }) {
    const removeDesired = () => emit('removeDesired', { productHeader: props.product.header })

    return { currency, removeDesired }
  }
}
</script>