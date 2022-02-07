<template>
  <div :class="{'container': container}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    container: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>