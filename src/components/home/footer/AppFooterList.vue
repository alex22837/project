<template>
  <div class="col-4">
    <h4 class="footer-list-h4">{{ header.toUpperCase() }}</h4>
    <div class="footer-list">
      <ul class="footer-list-ul ps-0">
        <li v-for="item of list" :key="item" :class="{
          'footer-list-item': true,
          'pb-15': item.text !== list[list.length - 1].text
        }">
          <a :href="item.link">{{ item.text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      required: true
    },
    header: {
      type: String,
      required: true
    }
  }
}
</script>