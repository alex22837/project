<template>
  <div class="total-cost">
    {{ totalCost }}
  </div>
</template>

<script>

export default {
  props: {
    totalCost: {
      type: Number,
      required: true
    }
  }
}
</script>