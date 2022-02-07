import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'


export function useValid() {
  const router = useRouter()
  const store = useStore()
  const { handleSubmit, isSubmiting, submitCount } = useForm()
  const { value: email, errorMessage: emailErr, handleBlur: emailBlur } = useField(
    'email',
    yup
      .string()
      .trim()
      .required('Это поле обязательно')
      .email('Введите корректный email')
  )
  const { value: password, errorMessage: pasErr, handleBlur: pasBlur } = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Это поле обязательно')
      .min(6, 'Введите корректный пароль(не меньше 6 символов)')
  )

  const onSubmiting = handleSubmit( async values => {
    try {
      await store.dispatch('auth/logIn', values)
      store.commit('messgae/removeMessage')
      router.push('/home')
    } catch(e) {
    }
  })

  const submiting = computed(() => {
    return isSubmiting
  })

  const tooManyTry = computed(() => {
    return submitCount.value >= 3
  })

  watch(tooManyTry, value => {
    value ? setTimeout(() => submitCount.value = 0, 15000) : false
  })

  return {
    email,
    password,
    emailErr,
    pasErr,
    emailBlur,
    pasBlur,
    onSubmiting,
    submiting,
    tooManyTry
  }
}