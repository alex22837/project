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
      <button @click="minusOne" :disabled="disabled">-</button>
      <input type="number" disabled min="1" class="basket-counter" v-model="counter">
      <button @click="plusOne">+</button><br />
      <button @click="remove">Удалить из корзины</button>
    </td>
    <td>
      {{ currency(total(product.priceWithSale, product.counter)) }}
    </td>
    <td>
      <button @click="createOrder" class="btn btn-primary">Оплатить</button>
    </td>
  </tr>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { total } from '../../util/total'
import { currency } from '../../util/currency'

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    userId: {
      type: String,
      required: false
    }
  },
  emits: ['createOrder', 'removeOrder'],
  setup(props, { emit }) {
    const store = useStore()
    const counter = ref(props.product.counter)

    const disabled = computed(() => {
      return counter.value === 1 ? true : false
    })

    const plusOne = () => counter.value++
    const minusOne = () => counter.value--

    const remove = () => store.dispatch('auth/remove', { 
      userId: props.userId, 
      productHeader: props.product.header 
    })

    const createOrder = async() => {
      emit('createOrder', { 
        userId: props.userId,
        productId: props.product.id, 
        priceWithSale: props.product.priceWithSale, 
        counter: props.product.counter, 
        totalCost: total(props.product.priceWithSale, props.product.counter),
        productHeader: props.product.header,
        img: props.product.img,
        sale: props.product.sale,
        price: props.product.price
      })
    }

    const removeOrder = async() => {
      emit('removeOrder', { 
        userId: props.userId,
        idOrder: props.product.idOrder, 
        productHeader: props.product.header 
      })
    }

    watch(counter, async val => {
      await store.dispatch('product/newCounter', { 
        userId: props.userId,
        productId: props.product.header,
        val
      })
    })

    return { counter, plusOne, minusOne, disabled, remove, total, currency, createOrder, removeOrder }
  }
};
</script>