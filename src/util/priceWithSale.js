export function priceWithSale(price, sale) {
  const sizeSale = 100 - sale
  const priceWithSale = (price * sizeSale) / 100

  return priceWithSale
}