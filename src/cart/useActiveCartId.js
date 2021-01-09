import useCommerce from '../useCommerce';

export default function useActiveCartId() {
  const commerce = useCommerce();

  if (commerce && commerce.cart) {
    return commerce.cart.id();
  }

  return null;
}
