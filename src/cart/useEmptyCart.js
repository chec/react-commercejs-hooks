import { useCallback } from 'react';
import useCommerce from '../useCommerce';
import cartUpdater from './cartUpdater';

export default function useEmptyCart() {
  const commerce = useCommerce();

  return useCallback(
    async () => cartUpdater(commerce, await commerce.cart.empty()),
    [commerce],
  );
}
