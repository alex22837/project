<template>
  <div
    :class="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    style: {
      type: Object,
      required: true
    },
    hover: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>