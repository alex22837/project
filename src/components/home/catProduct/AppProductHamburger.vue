<template>
  <ul class="product-cat-hamburger-ul d-flex justify-content-between px-0">
    <app-item
      v-for="item of category"
      :key="item"
      :item="item"
      :activeIndex="currentCategory"
      @updateCat="newCat"
      class="product-cat-hamburger-item"
    ></app-item>
  </ul>
</template>

<script>
import { watch, ref } from 'vue'
import AppItem from '../../../ui/AppItem.vue'
export default {
  components: {AppItem},
  props: {
    category: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emit: ['update:modelValue'],
  setup(props, {emit}) {
    const currentCategory = ref(props.category[0].name)

    const newCat = (item) => {
      currentCategory.value = item.name
    }

    watch(currentCategory, values => {
      emit('update:modelValue', values)
    })

    return {currentCategory, newCat}
  }
}
</script>