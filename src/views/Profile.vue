<template>
  <app-loader v-if="loader"></app-loader>
  <app-wrapper :container="true" v-else-if="user">
    <div class="profile-username d-flex justify-content-between">
      <h2>Имя пользователя: {{ user.email.split('@')[0] }}</h2>
      <button class="btn btn-primary" @click="logOut">Выйти</button>
    </div>
    <div class="profile-item d-flex w-25 justify-content-between" v-if="user.basket">      
      <p>Товаров в корзине: {{ Object.keys(user.basket).length }}</p>
      <router-link to="/basket">
        <button class="btn btn-primary">Перейти</button>
      </router-link>
    </div>
    <div class="profile-item d-flex w-25 justify-content-between" v-if="user.order">
      <p>Заказов: {{ Object.keys(user.order).length }}</p>
      <router-link to="/order">
        <button class="btn btn-primary">Перейти</button>
      </router-link>
    </div>
    <div class="profile-item d-flex w-25 justify-content-between" v-if="user.desired">
      <p>Товаров в желаемом: {{ Object.keys(user.desired).length }}</p>
      <router-link to="/desired">
        <button class="btn btn-primary">Перейти</button>
      </router-link>
    </div>
  </app-wrapper>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppWrapper from '../ui/AppWrapper.vue'
import AppLoader from '../components/AppLoader.vue'

export default {
  components: { AppWrapper, AppLoader },
  setup() {
    const store = useStore()
    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    const loader = computed(() => {
      return store.getters['loader/getLoader']
    })

    const logOut = async () => await store.dispatch('auth/logOut')

    store.getters['auth/getUser']

    return { user, loader, logOut }
  }
}
</script>