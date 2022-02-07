<template>
  <app-loader v-if="loader"></app-loader>
  <app-wrapper v-else-if="about">
    <app-wrapper :container="true">
      <app-block v-for="block of about.block.slice(0, 4)" :key="block" :block="block"></app-block>
    </app-wrapper>
    <app-footer :footer="footer" v-if="footer"></app-footer>
  </app-wrapper>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '../components/AppLoader.vue'
import AppWrapper from '../ui/AppWrapper.vue'
import AppBlock from '../components/about/AppBlock.vue'
import AppFooter from '../components/home/AppFooter.vue'

export default {
  components: { AppLoader, AppWrapper, AppBlock, AppFooter },
  setup() {
    const store = useStore()

    onBeforeMount(async () => {
      store.commit('loader/setLoader')
      if (!store.getters['about/isAbout'])
        await store.dispatch('about/getAbout')
      if (!store.getters['footer/isFooter'])
        await store.dispatch('footer/getFooter')
      store.commit('loader/setLoader')
    })

    const about = computed(() => {
      return store.getters['about/getAbout']
    })

    const loader = computed(() => {
      return store.getters['loader/getLoader']
    })

    const footer = computed(() => {
      return store.getters['footer/getFooter']
    })

    return { about, loader, footer }
  }
}
</script>