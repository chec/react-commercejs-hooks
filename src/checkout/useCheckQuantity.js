import { useCallback, useContext } from 'react';
import { CheckoutContext } from './CheckoutProvider';
import useCommerce from '../useCommerce';

export default function useCheckQuantity() {
  const commerce = useCommerce();
  const { checkout, updateLive } = useContext(CheckoutContext);

  return useCallback(
    async (lineItemId, quantity, variants = {}) => {
      if (!checkout || !commerce) {
        return null;
      }

      return commerce.checkout.checkQuantity(
        checkout.id,
        lineItemId,
        {
          amount: quantity,
          variants,
        },
      ).then((result) => {
        updateLive(result.live);
        return result;
      });
    },
    [checkout, commerce],
  );
};
