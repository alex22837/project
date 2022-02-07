<template>
    <div class="no-matches">
      <h2 class="no-matches-title">{{ message.title }}</h2>
      <p class="no-matches-descr">{{ message.descr }}</p>
      <button class="no-matches-btn" @click="$emit('resetFilters')">Сбросить фильтры</button>
    </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>