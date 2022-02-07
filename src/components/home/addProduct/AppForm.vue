<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="img" class="form-label">Введите путь к изображению</label>
      <input type="img" class="form-control" v-model="img" @blur="imgBlur">
      <small class="text-danger" v-if="imgErr">{{ imgErr }}</small>
    </div>
    <div class="mb-3">
      <label for="header" class="form-label">Название</label>
      <input type="text" class="form-control" id="header" v-model="header" @blur="headerBlur">
      <small class="text-danger" v-if="headerErr">{{ headerErr }}</small>
    </div>
    <div class="mb-3">
      <label for="descr" class="form-label">Описание</label>
      <textarea class="form-control" id="descr" rows="5" v-model="descr" @blur="descrBlur"></textarea>
      <small class="text-danger" v-if="descrErr">{{ descrErr }}</small>
    </div>
    <div class="mb-3">
      <label for="price" class="form-label">Цена</label>
      <input type="number" min="10" max="10000" class="form-control" id="price" v-model="price" @blur="priceErr">
      <small class="text-danger" v-if="priceErr">{{ priceErr }}</small>
    </div>
    <div class="mb-3">
      <label for="sale" class="form-label">Скидка</label>
      <input type="number" min="0" max="50" class="form-control" id="sale" v-model="sale" @blur="saleaBlur">
      <small class="text-danger" v-if="saleErr">{{ saleErr }}</small>
    </div>
    <button class="btn btn-primary" :disabled="isSubmit">Опубликовать</button>
  </form>
</template>

<script>
import { useValidForm } from '../../../use/validFormNewProduct'

export default {
  setup() {
    return { ...useValidForm() }
  }
}
</script>