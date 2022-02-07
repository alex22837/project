<template>
  <div class="have-account">
    <router-link :to="`/${link}`">
      <button class="btn">{{ link === 'login' ? 'Войти в существующий аккаунт' : 'Зарегистрироваться' }}</button>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true
    }
  }
}
</script>