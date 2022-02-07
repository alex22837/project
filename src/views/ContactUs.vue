<template>
  <app-loader v-if="loader"></app-loader>
  <app-feedback v-else></app-feedback>
</template>

<script>
import { onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '../components/AppLoader.vue'
import AppFeedback from '../components/home/AppFeedback.vue'
import AppFooter from '../components/home/AppFooter.vue'

export default {
  components: { AppLoader, AppFeedback, AppFooter },
  setup() {
    const store = useStore()

    onBeforeMount(async () => {
      if (!store.getters['about/isAbout']) {
        store.commit('loader/setLoader')
          await store.dispatch('about/getAbout')
        store.commit('loader/setLoader')
      }
    })

    const loader = computed(() => {
      return store.getters['loader/getLoader']
    })

    const about = computed(() => {
      return store.getters['about/getAbout']
    })

    return { loader, about }
  }
}
</script>