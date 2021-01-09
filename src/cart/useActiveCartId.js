import useCommerce from '../useCommerce';

export default function useActiveCartId() {
  const commerce = useCommerce();
  return commerce.cart.id();
}
