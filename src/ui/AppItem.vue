<template>
  <li 
    :class="{
      'product-cat-active': item.name === activeIndex || item === activeIndex, 
      'product-cat-li': item.name != activeIndex || item === activeIndex
    }" 
    @click="update(item, value)"
  >{{ typeof item === 'object' ? item.value : item }}</li>
</template>

<script>
export default {
  props: {
    item: {
      type: [Object, String],
      required: true
    },
    activeIndex: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: false
    }
  },
  emits: ['updateCat'],
  setup(_, {emit}) {
    const update = (data1, data2) => {
      data2 ? emit('updateCat', { name: data1, value: data2 }) : emit('updateCat', data1 )
    }

    return { update }
  }
}
</script>