import { getDatabase, ref, set, update } from 'firebase/database'


export async function buy(userId, product, counter) {
  const db = getDatabase()
  const len = arguments.length
  if (len == 2) {
    set(ref(db, `users/${userId}/basket/${product.header}`), {
      productId: product.productId,
      counter: 1,
    });
  } else {
    counter = counter + 1
    update(ref(db, `users/${userId}/basket/${product.header}`), {
      counter
    });
  }
}