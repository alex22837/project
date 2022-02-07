<template>
  <app-loader v-if="loader || !user"></app-loader>
  <app-wrapper :container="true" v-else>
    <div class="desired">
      <div class="basket-table-content mt-5" v-if="user.desired">
        <router-link to="/order"><button class="btn btn-primary">Ваши заказы</button></router-link>
        <router-link to="/basket"><button class="btn btn-primary ms-3">Корзина</button></router-link>
        <table class='table'>
          <thead>
            <tr>
              <th scope="col">Изображение</th>
              <th scope="col">Название</th>
              <th scope="col">Цена</th>
              <th scope="col">Скида (если есть)</th>
              <th scope="col">Исполнить желание</th>
            </tr>
          </thead>
          <tbody>
            <app-desired-item
              v-for="product of products.filter(e => user.desired.hasOwnProperty(e.header))"
              :key="product.id"
              :product="product"
              :userId="user.uid"
              @removeDesired="removeDesired"
            ></app-desired-item>
          </tbody>
        </table>
      </div>
      <app-no-table-item 
        v-else
        header="Желания отсутствуют" 
        text="Похоже, вы ничего не желаете, но это можно легко исправить!"
        :links="[
          { text: 'К покупкам', url: '/products' },
          { text: 'Корзина', url: '/basket' },
          { text: 'Мои заказы', url: '/order' }
        ]"
      ></app-no-table-item>
    </div>
  </app-wrapper>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '../components/AppLoader.vue'
import AppWrapper from '../ui/AppWrapper.vue'
import AppDesiredItem from '../components/desired/AppDesiredItem.vue'
import AppNoTableItem from '../ui/AppNoTableItem.vue'

export default {
  components: { AppLoader, AppWrapper, AppDesiredItem, AppNoTableItem },
  setup() {
    const store = useStore()

    const loader = computed(() => {
      return store.getters['loader/getLoader']
    })

    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    const products = computed(() => {
      return store.getters['product/getProducts']
    })

    const removeDesired = async data => await store.dispatch('auth/removeDesired', data)

    return { loader, user, products, removeDesired }
  }
}
</script>