<template>
  <span class="product-cat-header-span">{{ descr }}</span>
  <h2 class="product-cat-header-h2 my-0">{{ header }}</h2>
</template>

<script>
import { computed, watch, ref } from 'vue'

export default {
  props: {
    header: {
      type: String,
      required: true
    },
    category: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const about = ref(props.category[0].value)

    const header = computed(() => {
      return props.header.toUpperCase()
    })

    const descr = computed(() => {
      return about
    })

    watch(header, val => {
      if (header.value.toLowerCase().includes('последние')) {
        about.value = 'Новая продукция'
      } else if (header.value.toLowerCase().includes('лучшие')) {
        about.value = 'Большие скидки'
      } else if (header.value.toLowerCase().includes('специальные')) {
        about.value = 'Интересные предложения'
      }
    })

    return { header, descr }
  }
}
</script>