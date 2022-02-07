const formater = new Intl.NumberFormat('de-DE', { currency: 'USD', style: 'currency' })

export function currency(value) {
  return formater.format(value)
}