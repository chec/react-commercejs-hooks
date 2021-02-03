import { useCallback } from 'react';
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
        {
          variant_id: variantId,
          option_id: optionId,
        },
      ).then((result) => {
        updateLive(result.live);
        return result;
      });
    },
    [checkout, commerce],
  );
};
