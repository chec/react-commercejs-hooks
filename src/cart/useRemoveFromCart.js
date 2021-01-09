import { useCallback } from 'react';
import useCommerce from '../useCommerce';
import cartUpdater from './cartUpdater';

export default function useRemoveFromCart() {
  const commerce = useCommerce();

  return useCallback(
    async (...args) => cartUpdater(commerce, await commerce.cart.remove(...args)),
    [commerce],
  );
}
