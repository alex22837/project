<template>
  <ul :class="{
    'product-ul': true, 
    'ps-4': true

  }">
    <div class="product-category">
      <app-item 
        v-for="categ of productsCateg" 
        :key="categ"
        :item="categ"
        :activeIndex="activeIndex"
        @updateCat="update"
      ></app-item>
    </div>
    <div class="product-filter">
      <app-item
        v-for="categ of productsFilterArr"
        :key="categ.name"
        :item="categ.name"
        :value="categ.value"
        :activeIndex="activeIndexFilter"
        @updateCat="updateFIlter"
      ></app-item>
    </div>
  </ul>
</template>

<script>
import AppItem from '../../ui/AppItem.vue'

export default {
  components: { AppItem },
  props: {
    productsCateg: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: String,
      required: true
    },
    productsFilterArr: {
      type: Array,
      required: true
    },
    activeIndexFilter: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['updateCat', 'updateFilter'],
  setup(_, { emit }) {
    const update = (data) => {
      emit('updateCat', data)
    }

    const updateFIlter = data => emit('updateFilter', data)

    return { update, updateFIlter }
  }
}
</script>