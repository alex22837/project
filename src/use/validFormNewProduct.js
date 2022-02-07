import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useValidForm() {
  const store = useStore()
  const { handleSubmit, isSubmiting, submitCount } = useForm()

  const { value: img, errorMessage: imgErr, handleBlur: imgBlur } = useField(
    'img',
    yup
      .string()
      .trim()
      .required('Это поле обязательно')
  )
  const { value: header, errorMessage: headerErr, handleBlur: headerBlur } = useField(
    'header',
    yup
      .string()
      .trim()
      .required('Это поле обязательно')
      .min(4, 'Длина заголовка не менее 4 символов')
  )
  const { value: descr, errorMessage: descrErr, handleBlur: descrBlur } = useField(
    'descr',
    yup
      .string()
      .trim()
      .required('Это поле обязательно')
      .min(30, 'Длина описания не менее 30 символов')
  )
  const { value: price, errorMessage: priceErr, handleBlur: priceBlur } = useField(
    'price',
    yup
      .number()
      .required('Это поле обязательно')
  )
  const { value: sale, errorMessage: saleErr, handleBlur: saleBlur } = useField(
    'sale',
    yup
      .number()
  )

  const onSubmit = handleSubmit( async () => {
    await store.dispatch('product/addProduct', {
      img: img.value,
      header: header.value,
      descr: descr.value.split('${-}'),
      price: price.value,
      sale: sale.value,
      date: new Date().toLocaleString('ru-RU').split(',')[0]
    })
  })

  const isSubmit = computed(() => {
    return isSubmiting
  })

  const tooManyTry = computed(() => {
    return submitCount >= 3
  })

  watch(tooManyTry, val => {
    if (val) {
      setTimeout(() => {
        submitCount = 0
      }, 10000)
    }
  })

  return { 
    img,
    imgErr,
    imgBlur,
    header,
    headerErr,
    headerBlur,
    descr,
    descrErr,
    descrBlur,
    price,
    priceErr,
    priceBlur,
    sale,
    saleErr,
    saleBlur,
    onSubmit,
    isSubmit,
    tooManyTry,
  }
}
