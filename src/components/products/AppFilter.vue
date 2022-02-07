<template>
  <span @click="$emit('changeFlag')" class="products-filter-span ps-4">Фильтры</span>
</template>

<script>
export default {
  props: {
    flag: {
      type: Boolean,
      required: true
    }
  },
  emits: ['changeFlag']
}
</script>