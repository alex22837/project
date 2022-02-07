<template>
  <div class="row d-flex justify-content-between">
    <app-page 
      v-for="item of products.filter(e => e.storehouse).slice(0, 6)" 
      :key="item.id" 
      :product="item" 
      :sale="false"
      :specialOffersBul="false"
      :contentBul="false"
      :imgWidth="250"
      :style="{'my-4': true}"
      :user="user"
    ></app-page>
  </div>
</template>

<script>
import AppPage from '../../../ui/AppPage.vue'

export default {
  components: { AppPage },
  props: {
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