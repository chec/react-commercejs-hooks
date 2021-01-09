import { useCallback } from 'react';
import { mutate } from 'swr';
import useCommerce from '../useCommerce';

export default function useCreateNewCart() {
  const commerce = useCommerce();

  return useCallback(
    async () => {
      mutate(['cart.retrieve', undefined], await commerce.cart.refresh(), false);
    },
    [commerce],
  );
}
