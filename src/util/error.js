const errMes = {
  EMAIL_NOT_FOUND: 'Неверный email',
  INVALID_PASSWORD: 'Неверный пароль',
  EMAIL_EXISTS: 'Данный email уже зарегестриован',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'Cлишком много ошибок попробуйте позже',
  auth: 'Сначала войдите в аккаунт',
  'user-not-found': 'Неверный email',
  'wrong-password': 'Неверный пароль'
}

export function error(err) {
  console.log(err)
  return errMes[err] ? errMes[err] : 'Неопознанная ошибка'
}