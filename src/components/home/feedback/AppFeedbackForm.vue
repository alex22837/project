<template>
  <form @submit.prevent="submit">
    <input type="email" class="feedback-input" v-model="email" placeholder="Введите свой email">
    <button class="feedback-btn">{{ 'Подписаться'.toUpperCase() }}</button>
  </form>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['subscribe'],
  setup(_, {emit}) {
    const email = ref()

    const submit = async () => emit('subscribe', email.value)

    return { email, submit }
  }
}
</script>