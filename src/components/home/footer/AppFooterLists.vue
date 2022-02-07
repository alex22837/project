<template>
  <div class="footer-list col-4" v-for="item of links" :key="item">
    <h4 class="footer-list-h4">{{ Object.keys(links[0]) }}</h4>
    <ul class="footer-list-ul ps-0">
      <li v-for="list of item" :key="list" :class="{
        'footer-list-item': true,
        'pb-15': item.descr[item.descr.length - 1].title !== list.title
      }">
        <a :href="list.link">{{ list.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    links: {
      type: Object,
      required: true
    }
  }
}
</script>