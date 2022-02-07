<template>
  <app-page 
    v-for="item of products.filter(e => toUnix(e.date)).splice(0, amountProducts)" 
    :key="item.id"
    :product="item"
    :imgWidth="imgWidth"
    :style="style"
    :user="user"
  ></app-page>
</template>

<script>
import AppPage from '../../../../ui/AppPage.vue'

export default {
  components: {AppPage},
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
  },
  setup(props) {
    const toUnix = date => {
      const day = date.split('.')[0]
      const month = date.split('.')[1] - 1
      const year = date.split('.')[2]

      return (Date.parse(new Date()) - Date.UTC(year, month, day)) < 2592000000 ? true : false
    }

    return { toUnix }
  }
}
</script>