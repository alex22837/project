<template>
  <div class="no-table-item d-flex flex-column align-items-center mt-5">
    <h2>{{ header }}</h2>
    <p v-if="text">{{ text }}</p>
    <div class="block-links w-50 d-flex align-items-stretch justify-content-around flex-wrap" v-if="links">
      <router-link v-for="link of links" :key="link.url" :to="link.url">
        <button class="btn btn-primary">{{ link.text }}</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false
    },
    links: {
      type: Array || Object,
      required: true
    }
  }
}
</script>