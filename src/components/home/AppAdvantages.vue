<template>
  <div class="container">
    <div class="advantages row d-flex">
      <div class="advantages-img col-6">
        <app-advantages-img :img="advantages.img"></app-advantages-img>
      </div>
      <div class="advantages-text col-6 d-flex flex-column align-self-center">
        <app-advantages-text :text="advantages.text"></app-advantages-text>
      </div>
    </div>
  </div>
</template>

<script>
import AppAdvantagesImg from './advantages/AppAdvantagesImg.vue'
import AppAdvantagesText from './advantages/AppAdvantagesText.vue'

export default {
  components: { AppAdvantagesImg, AppAdvantagesText },
  props: {
    advantages: {
      type: Object,
      required: true
    }
  }
}
</script>