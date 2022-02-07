<template>
  <app-loader v-if='!user'></app-loader>
  <app-wrapper :container='true' v-else>
    <div class="d-flex justify-content-center tac">
      <app-message></app-message>
    </div>
    <div class="basket-table-content mt-5" v-if='user.basket'>
      <router-link to="/order"><button class="btn btn-primary">Ваши заказы</button></router-link>
      <router-link to="/desired"><button class="btn btn-primary ms-3">Желания</button></router-link>
      <table class='table'>
        <thead>
          <tr>
            <th scope='col'>Изображение</th>
            <th scope='col'>Название</th>
            <th scope='col'>Цена</th>
            <th scope='col'>Скида (если есть)</th>
            <th scope='col'>Количесвто</th>
            <th scope='col'>Итого</th>
            <th scope="col">Купить</th>
          </tr>
        </thead>
        <tbody>
          <app-basket-item
            v-for="product of products.filter(e => user.basket[e.header])"
            :key="product.header"
            :product="{...product, counter: user.basket[product.header].counter}"
            :userId="user.uid"
            @createOrder="createOrder"
            @removeOrder="removeOrder"
          ></app-basket-item>
        </tbody>
      </table>
    </div>
    <app-no-table-item 
      v-else
      header="Корзина пустая"
      :links="[
        { text: 'К покупкам', url: '/products' },
        { text: 'Желания', url: '/desired' },
        { text: 'Мои заказы', url: '/order' }
      ]"
      ></app-no-table-item>
  </app-wrapper>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '../components/AppLoader.vue'
import AppWrapper from '../ui/AppWrapper.vue'
import AppMessage from '../ui/AppMessage.vue'
import AppBasketItem from '../components/basket/AppBasketItem.vue'
import AppNoTableItem from '../ui/AppNoTableItem.vue'
import AppTotalCost from '../components/basket/AppTotalCost.vue'

export default {
  components: { AppLoader, AppWrapper, AppMessage, AppBasketItem, AppNoTableItem, AppTotalCost },
  setup() {
    const store = useStore()

    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    const products = computed(() => {
      return store.getters['product/getProducts']
    })

    const createOrder = async(data) => await store.dispatch('auth/createOrder', data)
    const removeOrder = async(data) => await store.dispatch('auth/removeOrder', data)

    return { user, createOrder, removeOrder, products }
  },
}
</script>