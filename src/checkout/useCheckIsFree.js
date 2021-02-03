import { useContext, useCallback } from 'react';
import { CheckoutContext } from './CheckoutProvider';
import useCommerce from '../useCommerce';

export default function useCheckIsFree() {
  const commerce = useCommerce();
  const { checkout } = useContext(CheckoutContext);

  useCallback(async () => {
    if (!checkout || !commerce) {
      return null;
    }

    return commerce.checkout.isFree(
      checkout.id,
    );
  }, [checkout, commerce]);
};
