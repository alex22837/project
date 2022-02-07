<template>
  <div 
    :class="{
      'col-4': true, 
      'd-flex': true, 
      'justify-content-center': true, 
      'px-0': true
    }" 
    v-for="product of filterProducts"
    :key="product.id">
    <app-page
      :product="product"
      :class="{'w-100': isOpen}"
      :imgWidth="isOpen ? 300 : 250"
      :style="{
        'mb-4': !isOpen, 
        'my-0': isOpen, 
        'animate__animated': true, 
        'animate__slideInRight': isOpen,
      }"
      :user="user"
    ></app-page>
  </div>
</template>

<script>
import AppPage from '../../ui/AppPage.vue'

export default {
  components: { AppPage },
  props: {
    filterProducts: {
      type: Array,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: false
    }
  } 
}
</script>