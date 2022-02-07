<template>
  <div class="alert">
    <h2 class="alert-title">{{ alert.title }}</h2>
    <p class="alert-descr">{{ alert.descr }}</p>
    <button class="alert-btn" @click="closeAlert">Close</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()

    const alert = computed(() => {
      return store.getters['alert/getAlert']
    })

    return { alert }
  }
}
</script>