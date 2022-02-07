<template>
  <div :class="style">
    <h3 class="product-cat-header">{{ header }}</h3>
    <span class="product-cat-special-offers" v-if="specialOffersBul && specialOffers">{{ specialOffers }}</span>
  </div>
</template>

<script>
export default {
  props: {
    style: {
      type: Object,
      required: true
    },
    header: {
      type: String,
      required: true
    },
    specialOffers: {
      type: String,
      required: false,
      default: null
    },
    specialOffersBul: {
      type: Boolean,
      required: true
    }
  }
}
</script>