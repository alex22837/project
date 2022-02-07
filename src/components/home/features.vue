<template>
  <div class="container">
    <div class="features row">
      <div class="col-6 d-flex flex-column align-self-center">
        <app-descr :product="product"></app-descr>
      </div>
      <div class="col-6 text-center">
        <app-img></app-img>
      </div>
    </div>
    <div class="row">
      <div class="features-logo d-flex justify-content-around">
        <app-footer></app-footer>
      </div>
    </div>
  </div>
</template>

<script>
import AppDescr from './features/AppDescr.vue'
import AppImg from './features/AppImg.vue'
import AppFooter from './features/AppFooter.vue'

export default {
  components: { AppDescr, AppImg, AppFooter },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

