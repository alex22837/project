<template>
  <span 
    class="product-cat-sale px-4"
    >Скидка {{ sale }}% только сегодня!
  </span>
</template>

<script>
export default {
  props: {
    sale: {
      type: Number,
      required: true
    }
  }
}
</script>