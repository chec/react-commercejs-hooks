import { useCallback, useContext } from 'react';
import { CheckoutContext } from './CheckoutProvider';
import useCommerce from '../useCommerce';

export default function useSetTaxZone() {
  const commerce = useCommerce();
  const { checkout, updateLive } = useContext(CheckoutContext);

  return useCallback(
    async (data = {}) => {
      if (!checkout || !commerce) {
        return null;
      }

      return commerce.checkout.setTaxZone(checkout.id, data)
        .then((result) => {
          updateLive(result.live);
          return result;
        });
    },
    [checkout, commerce],
  );
};
