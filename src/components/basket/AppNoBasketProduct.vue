<template>
  <div class="basket-no-item d-flex flex-column align-items-center mt-5">
    <h2>Корзина пустая</h2>
    <router-link to="/products">
      <button class="btn btn-primary">К продуктам</button>
    </router-link>
    <router-link to="/order">
      <button class="btn btn-primary mt-3">Ваши заказы</button>
    </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>