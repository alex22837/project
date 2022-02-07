<template>
  <div class="footer-bgc">
    <div class="container">
      <div class="footer row">
        <div class="footer-about col-3">
          <app-about :whoWe="footer.whoWe"></app-about>
        </div>
        <div class="footer-lists col-6 row">
          <app-footer-list
            v-for="(item, idx) of footer.links" 
            :key="idx" 
            :list="item"
            :header="idx"
          ></app-footer-list>
        </div>
        <div class="footer-network col-3 row">
          <app-network :history="footer.history"></app-network>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppAbout from './footer/AppFooterAbout.vue'
import AppFooterList from './footer/AppFooterList.vue'
import AppNetwork from './footer/AppFooterNetwork.vue'

export default {
  components: { AppAbout, AppFooterList, AppNetwork },
  props: {
    footer: {
      type: Object,
      required: true
    }
  }
}
</script>