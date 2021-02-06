import useCommerce from '../useCommerce';
import Cookie from 'js-cookie';

/**
 * Returns a string cart ID, or null if Commerce.js is not available
 */
export default function useActiveCartId(): null | string {
  const commerce = useCommerce();

  if (commerce && commerce.cart) {
    // Fallback to accessing the cookie ourselves, as the implementation provided by Commerce.js itself is a bit flakey
    return commerce.cart.id() || Cookie.get('commercejs_cart_id');
  }

  return null;
}
