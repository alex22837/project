<template>
  <div @mouseenter="WillHover" @mouseleave="WillNotHover" :class="{
    'product-cat-block': true,
    'col-3': true,
    'd-flex': true,
    'flex-column': true,
    'justify-content-center':true,
    'px-0': true,
    ...style
    }">
    <app-product-sale
      v-if="product.sale && sale" 
      :sale="product.sale"
    ></app-product-sale>
    <app-product-img
      :style="{
        'product-cat-block-img': true,
        'w-100': true, 
        'd-flex': true, 
        'flex-column': true, 
        'justify-content-center': true,
      }"
      :img="product.img"
      :imgWidth="imgWidth"
      :id="product.id"
    ></app-product-img> 
    <app-product-content
      v-if="contentBul || hover"
      :style="{
        'product-cat-content': true,
        'px-4': true,
        'd-flex': hover,
        'flex-column': hover,
        'bgc-fafafa': contentBul && hover,
        'animate__animated': true,
        'animate__fadeInUp': hover,
        'animate__fadeInDown': !hover
      }"
      :hover="hover">
      <app-btn-buy
        v-if="hover"
        :productId="product.id"
        :productHeader="product.header"
        :style="{ 
          'product-cat-hover-block-img': true, 
          'd-flex': true, 
          'justify-content-between': true, 
          'align-items-center': true, 
          'animate__animated': hover, 
          'animate__fadeInUp': hover,
          'animate__fast': hover,
        }"
        :user="user"
        @createDesired="createDesired"
        @removeDesired="removeDesired"
        @buyProduct="buyProduct"
      ></app-btn-buy>
      <app-product-text
        v-else
        :style="{
          'product-cat-no-hover': true,
          'animate__animated': hover,
          'animate__fadeInUp': !hover,
          'animate__fast': !hover,
        }"
        :header="product.header"
        :specialOffers="product.special_offers ? product.special_offers : null"
        :specialOffersBul="specialOffersBul"
      ></app-product-text>
      <app-product-price
        :price="product.price" 
        :sale="product.sale"
      ></app-product-price>
    </app-product-content>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppBtnBuy from './cat/AppBtnBuy.vue'
import AppProductPrice from './cat/AppProductPrice.vue'
import AppProductText from './cat/AppProductText.vue'
import AppProductImg from './cat/AppProductImg.vue'
import AppProductSale from './cat/AppProductSale.vue'
import AppProductContent from './cat/AppProductContent.vue'
import { buy } from '../util/buy'

export default {
  components: { AppBtnBuy, AppProductPrice, AppProductText, AppProductImg, AppProductSale, AppProductContent },
  props: {
    product: {
      type: Object,
      required: true
    },
    sale: {
      type: Boolean,
      required: false,
      default: true
    },
    specialOffersBul: {
      type: Boolean,
      required: false,
      default: false
    },
    contentBul: {
      type: Boolean,
      required: false,
      default: true
    },
    imgWidth: {
      type: Number,
      required: true
    },
    style: {
      type: Object,
      required: false,
      default: undefined
    },
    user: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const hover = ref(null)

    const WillHover = () => hover.value = true
    const WillNotHover = () => hover.value = false

    const createDesired = async () => {
      if (props.user) {
        await store.dispatch('auth/createDesired', { 
          productId: props.product.id, 
          productHeader: props.product.header 
        })
      } else {
        router.push('/login')
        store.dispatch('message/setMessage', { value: 'Вы не зарегестрированны', type: 'warning' })
      }
    }

    const removeDesired = async () => {
      if (props.user) {
        await store.dispatch('auth/removeDesired', {
          productHeader: props.product.header
        })
      } else {
        router.push('/login')
        store.dispatch('messgae/setMessage', { value: 'Вы не зарегестрированны', type: 'warning' })
      }
    }

    const buyProduct = async () => {
      if (props.user && props.user.basket && props.user.basket[props.product.header]) {
        buy(props.user.uid, {  header: props.product.header, productId: props.product.id}, props.user.basket[props.product.header].counter)
      } else if (props.user) {
        buy(props.user.uid, { header: props.product.header, productId: props.product.id })
      } else {
        router.push('/login')
        store.dispatch('message/setMessage', { value: 'Вы не зарегестрированны', type: 'warning' })
      }
    }

    return { hover, WillHover, WillNotHover, createDesired, removeDesired, buyProduct }
  }
}
</script>