<template>
  <div class="product-cat-footer d-flex justify-content-center align-items-center">
    <router-link to="/products">
      <span class="product-cat-footer-span">{{ 'view all'.toUpperCase() }} </span>
      <img src="../../../../img/arrow.png" alt="arrow">
    </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>