<template>
  <app-loader v-if="loader"></app-loader>
  <app-wrapper :container="true" v-else-if="user">
    <div class="order mt-5" v-if="user.order">
      <router-link to="/basket">
        <button class="btn btn-primary">Корзина</button>
      </router-link>
      <router-link to="/desired">
        <button class="btn btn-primary ms-3">Желания</button>
      </router-link>
      <table class='table'>
        <thead>
          <tr>
            <th scope='col'>Изображение</th>
            <th scope='col'>Название</th>
            <th scope='col'>Дата заказа</th>
            <th scope='col'>Цена</th>
            <th scope='col'>Скида (если есть)</th>
            <th scope='col'>Количесвто</th>
            <th scope='col'>Итого</th>
          </tr>
        </thead>
        <tbody>
          <app-order-item
            v-for="item of user.order"
            :key="item"
            :product="item"
          ></app-order-item>
        </tbody>
      </table>
    </div>
    <app-no-table-item
      v-else
      header="Заказов пока нет"
      :links="[
        { text: 'К покупкам', url: '/products' },
        { text: 'Корзина', url: '/basket' },
        { text: 'Желания', url: '/desired' }
      ]"
    ></app-no-table-item>
  </app-wrapper>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '../components/AppLoader.vue'
import AppWrapper from '../ui/AppWrapper.vue'
import AppOrderItem from '../components/order/AppOrderItem.vue'
import AppNoTableItem from '../ui/AppNoTableItem.vue'

export default {
  components: { AppLoader, AppWrapper, AppOrderItem, AppNoTableItem },
  setup() {
    const store = useStore()

    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    const loader = computed(() => {
      return store.getters['loader/getLoader']
    })

    return { user, loader }
  }
}
</script>