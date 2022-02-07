<template>
  <div
  :class="{
    'about-block': true,
    ...toObject(block.style)
  }">
    <div 
    :class="{
      'about-block-text': true,
      ...toObject(block.styleBlockText)
    }">
      <sub v-if="block.subTitle" :class="{...toObject(block.styleSubTitle)}">{{ block.subTitle }}</sub>
      <h2 :class="{...toObject(block.styleH2)}">{{ block.title }}</h2>
      <p :class="{...toObject(block.styleP)}">{{ block.descr }}</p>
    </div>
    <div class="block-img-with-quote row">
      <div class="about-block-img" :class="{'col-6': block.quote, ...toObject(block.styleBlockImg)}">
        <img
          :src="block.img" 
          :class="{...toObject(block.styleImg)}"
        >
      </div>
      <div v-if="block.quote" :class="{'col-6': true, 'about-block-quote': true, ...toObject(block.styleBlockQuote)}">
        <p class="fs-28">"{{ block.quote }}"</p>
        <span>{{ block.quoteFrom }}</span>
        <span>{{ block.post }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object || Array,
      required: true
    }
  },
  setup() {
    const toObject = data => Object(data)

    return { toObject }
  }
}
</script>