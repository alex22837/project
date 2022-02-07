<template>
  <h5 class="text-war">Любимые бренды</h5>
  <h2 class="fs-61">
    <span class="text-blue">Захватывающее место<br /></span> 
    для всей семьи, чтобы делать покупки.
  </h2>
  <p class="features-text">
    Самый удобный способ покупать любимые продукты Apple.
  </p>
  <div class="features-req">
    <router-link :to="`/products/${product.id}`">
      <button class="features-btn">КУПИТЬ СЕЙЧАС</button>
    </router-link>
    <small class="features-price">$ 249.99</small>
    <s>$ 249.99</s>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>