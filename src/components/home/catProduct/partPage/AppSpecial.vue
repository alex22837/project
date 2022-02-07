<template>
  <app-page 
    v-for="item of products.filter(e => e.special_offers).splice(0, amountProducts)" 
    :key="item.id" 
    :product="item"
    :imgWidth="imgWidth"
    :specialOffersBul="true"
    :style="style"
    :user="user"
  ></app-page>
</template>

<script>
import AppPage from '../../../../ui/AppPage.vue'

export default {
  components: { AppPage },
  props: {
    products: {
      type: Array,
      required: true
    },
    imgWidth: {
      type: Number,
      required: true
    },
    style: {
      type: Object,
      required: false,
      default: undefined
    },
    amountProducts: {
      type: Number,
      required: false,
      default: 6
    },
    user: {
      type: Object,
      required: false
    }
  }
}
</script>