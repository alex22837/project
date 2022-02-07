<template>
  <div :class="style">
    <img src="../../img/shopping-cart.png" alt="cart" @click="buyProduct" class="buy-product-img">
    <router-link :to="`/products/${productId}`"><img src="../../img/zoom-in.png" alt="zoom-in"></router-link>
    <span 
      v-if="!imgUrl.includes('active')"
      :class="{
        'desired-img': true,
        'desired-img-no-active': true
      }"
      @click="createDesired" 
    ></span>
    <span 
      v-else
      :class="{
        'desired-img': true,
        'desired-img-active': true
      }"
      @click="removeDesired" 
    ></span>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    style: {
      type: Object,
      required: true
    },
    productId: {
      type: String,
      required: true
    },
    productHeader: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: false
    }
  },
  emits: ['createDesired', 'removeDesired', 'buyProduct'],
  setup(props, { emit }) {
    const imgUrl = computed(() => {
      return props.user && props.user.desired ? `../../img/heart${props.user.desired[props.productHeader] ? '-active' : ''}.png` : '../../img/heart.png'
    })

    const createDesired = () => emit('createDesired')
    const removeDesired = () => emit('removeDesired')
    const buyProduct = () => emit('buyProduct')

    return { imgUrl, createDesired, removeDesired, buyProduct }
  }
}
</script>