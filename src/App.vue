<template>
  <component :is="`${layout}-layout`"></component>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Login from './layout/LoginLayout.vue'
import Main from './layout/MainLayout.vue'

export default {
  components: {
    'login-layout': Login,
    'main-layout': Main
  },
  setup() {
    const route = useRoute()
    const layout = computed(() => {
      return route.meta.layout
    })

    return {layout}
  }
}
</script>

<style>
</style>
