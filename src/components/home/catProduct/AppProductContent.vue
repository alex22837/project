<template>
  <div class="row d-flex justify-content-between">
    <component
      :is="component" 
      :products="products" 
      :imgWidth="250" 
      :style="{
        'my-4': true
      }" 
      :amountProducts="6"
      :user="user"
    ></component>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { computed } from 'vue'
import AppBest from './partPage/AppBest.vue'
import AppRecent from './partPage/AppRecent.vue'
import AppSpecial from './partPage/AppSpecial.vue'
import AppFooter from './partPage/AppFooter.vue'

export default {
  components: {
    'app-best': AppBest,
    'app-recent': AppRecent,
    'app-special': AppSpecial,
    'app-footer': AppFooter
  },
  props: {
    categ: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: false
    }
  },
  setup(props) {

    return { 
      component: computed(() => `app-${props.categ.split(' ')[0]}`),
      products: props.products
    }
  }
}
</script>