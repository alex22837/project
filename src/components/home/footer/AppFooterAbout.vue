<template>
  <div class="footer-logo-div">
    <div class="col-3 tac">
      <img :src="whoWe.logo" class="footer-logo"><br>
    </div>
    <span class="text-primary footer-logo-text-span">{{ whoWe.title.toUpperCase() }}</span>
  </div>
  <div class="footer-text-div">
    <p class="footer-text">{{ whoWe.descr }}</p>
  </div>
</template>

<script>
export default {
  props: {
    whoWe: {
      type: Object,
      required: true
    }
  }
}
</script>