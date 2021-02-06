import { mutate } from 'swr';

// TODO replace with c.js types
export default (commerce: any, response: any) => {
  if (response.success) {
    // Mutate entries for the current cart and the specific cart ID
    mutate(['cart.retrieve', undefined], response.cart, false);
    mutate(['cart.retrieve', commerce.cart.id()], response.cart, false);
  }

  return response;
}
