import { mutate } from 'swr';

export default (commerce, response) => {
  if (response.success) {
    // Mutate entries for the current cart and the specific cart ID
    mutate(['cart.retrieve', undefined], response.cart, false);
    mutate(['cart.retrieve', commerce.cart.id()], response.cart, false);
  }

  return response;
}
