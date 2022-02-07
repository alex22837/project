<template>
  <div class="feedback-bgc">
    <div class="container">
      <div class="feedback d-flex justify-content-around align-items-center">
        <div class="feedback-text">
          <app-text></app-text>
        </div>
        <div class="feedback-form">
          <app-form @subscribe="subscribe"></app-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import AppText from './feedback/AppFeedbackText.vue'
import AppForm from './feedback/AppFeedbackForm.vue'

export default {
  components: { AppText, AppForm },
  setup() {
    const store = useStore()
    const subscribe = async data => await store.dispatch('feedback/setEmail', data)

    return { subscribe }
  }
}
</script>