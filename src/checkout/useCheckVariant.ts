import { useCallback, useContext } from 'react';
import { CheckoutContext } from './CheckoutProvider';
import useCommerce from '../useCommerce';

export default function useCheckVariant() {
  const commerce = useCommerce();
  const { checkout, updateLive } = useContext(CheckoutContext);

  return useCallback(
    async (lineItemId, variantId, optionId) => {
      if (!checkout || !commerce) {
        return null;
      }

      return commerce.checkout.checkVariant(
        checkout.id,
        lineItemId,
        { options: [optionId] },
      ).then((result: any) => {
        updateLive(result.live);
        return result;
      });
    },
    [checkout, commerce],
  );
};
