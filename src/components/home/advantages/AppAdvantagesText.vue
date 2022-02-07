<template>
  <div class="advantages-text-header">
    <span class="advantages-text-header-span">Будьте с нами</span>
    <h2 class="advantages-text-header-h2">{{ text.header }}</h2>
  </div>
  <div class="advantages-text-content">
    <p v-for="item of text.content" :key="item">{{ item }}</p>
  </div>
  <div class="advantages-text-superiority">
    <ul v-if="text.superiority" class="advantages-text-ul">
      <li 
        v-for="item of text.superiority" 
        :key="item" 
        :class="{
          'advantages-text-li': true, 
          'pb-20': item !== text.superiority[text.superiority.length-1]
        }"
        >{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: Object,
      required: true
    }
  }
}
</script>