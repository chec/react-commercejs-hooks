import { useCallback, useContext } from 'react';
import { CheckoutContext } from './CheckoutProvider';
import useCommerce from '../useCommerce';

export default function useLocationFromIp() {
  const commerce = useCommerce();
  const { checkout } = useContext(CheckoutContext);

  return useCallback(
    async (ipAddress = '') => {
      if (!checkout || !commerce) {
        return null;
      }

      return commerce.checkout.getLocationFromIP(checkout.id, ipAddress);
    },
    [checkout, commerce],
  );
};
