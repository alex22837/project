<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav me-auto mb-2 mb-lg-0">
          <router-link to="/home">
            <img src="../img/logo.png" alt="">
            <span class="text-primary">LinkedTech</span>
          </router-link>
        </div>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Product</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact_us">Contact us</router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="isToken">
          <li class="nav-item">
            <router-link to="/desired">
              <img src="../img/heart.png">
            </router-link>
          </li>
          <li class="nav-item px-2">
            <router-link to="/basket">
              <img src="../img/cart.png">
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile">
              <img src="../img/user.png">
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-else>
          <li class="nav-item mx-2">
            <router-link to="/login">
              <button class="btn btn-primary">login</button>
            </router-link>
          </li>
          <li class="nav-item mx-2">
            <router-link to="/registration">
              <button class="btn btn-info">registr</button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    return { isToken: computed(() => store.getters['auth/isToken']) }
  }
}
</script>