<template>
    <div :class="{...style}">
      <router-link :to="`/products/${id}`" class="product-cat-img d-flex align-self-center">
        <img :src="img" :width="imgWidth">
      </router-link>
    </div>
</template>

<script>
export default {
  props: {
    style: {
      type: Object,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    imgWidth: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
}
</script>