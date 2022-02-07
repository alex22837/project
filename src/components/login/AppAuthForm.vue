<template>
  <form @submit.prevent="onSubmiting" class="d-flex flex-column align-self-center login-form">
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email" v-model="email" @blur="emailBlur">
      <small id="emailHelp" class="form-text text-danger" v-if="emailErr">{{ emailErr }}</small>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" @blur="pasBlur">
      <small id="pasHelp" class="form-text text-danger" v-if="pasErr">{{ pasErr }}</small>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="submiting || tooManyTry">Submit</button>
    <small class="form-text text-danger" v-if="tooManyTry"><br>Слишком много попыток входа, попробуйте позже</small>
  </form>
</template>

<script>
import { useValid } from '../../use/validationAuth'

export default {
  setup() {
    return {...useValid()}
  }
}
</script>