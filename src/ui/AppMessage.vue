<template>
  <div v-if="message" :class="['mt-4', 'alert', 'tac', type]">
    <h2 class="message-header">{{ header }}</h2>
    <p class="message-text">{{ message.value }}</p>
    <button 
      :class="{
        'btn': true,
        'btn-danger': message.type === 'danger',
        'btn-primary': message.type === 'primary',
        'btn-warning': message.type === 'warning',
      }" 
      @click="$store.commit('message/removeMessage')"
    >Закрыть</button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const message = computed(() => {
      return store.getters['message/getMessage']
    })

    const titleMap = {
      primary: 'Успешно',
      danger: 'Ошибка',
      warning: 'Внимание'
    }

    const header = computed(() => {
      return titleMap[message.value.type]
    })

    const type = computed(() => {
      return `alert-${message.value.type}`
    })

    return { message, header, type }
  }
}
</script>