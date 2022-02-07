<template>
  <div class="px-4">
    <input
      list="search"
      type="text" 
      class="form-control" 
      placeholder="Введите название товара" 
      v-model="modelValue" 
      @input="$emit('update:modelValue', modelValue)"
    >
    <datalist id="search" v-if="modelValue">
      <option v-for="item of products" :key="item.id" :value="item.header" />
    </datalist>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: undefined,
      required: true
    },
    products: {
      type: Array,
      required: false
    }
  },
  emits: ['update:modelValue'],
}
</script>