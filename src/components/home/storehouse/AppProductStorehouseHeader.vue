<template>
  <span class="product-storehouse-span">{{ '"Исторический магазин"'.toUpperCase() }}</span>
  <h2 class="product-storehouse-h2">{{ storehouse.header }}</h2>
  <p class="product-storehouse-p">{{ storehouse.descr }}</p>
</template>

<script>
export default {
  props: {
    storehouse: {
      type: Object,
      required: true
    }
  }
}
</script>