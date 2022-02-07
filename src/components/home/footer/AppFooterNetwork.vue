<template>
  <h3 class="footer-text-h3">{{ history.title.toUpperCase() }}</h3>
  <p class="footer-text-p">{{ history.descr }}</p>
  <div class="footer-social_network col-8 d-flex justify-content-between align-items-center">
    <a v-for="item of history.network" :key="item.link" :href="item.link"><img :src="item.logo"></a>
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Object,
      required: true
    }
  }
}
</script>