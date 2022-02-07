<template>
  <app-wrapper :container="true">
    <div class="login d-flex flex-column align-items-center justify-content-center">
      <app-message></app-message>
      <app-to-home></app-to-home>
      <h2>Логин</h2>
      <app-auth-form></app-auth-form>
      <app-have-account link="registration"></app-have-account>
    </div>
  </app-wrapper>
</template>

<script>
import AppWrapper from '../ui/AppWrapper.vue'
import AppToHome from '../ui/AppToHome.vue'
import AppAuthForm from '../components/login/AppAuthForm.vue'
import AppMessage from '../ui/AppMessage.vue'
import AppHaveAccount from '../ui/AppHaveAccount.vue'

export default {
  components: { AppWrapper, AppToHome, AppAuthForm, AppMessage, AppHaveAccount },
}
</script>