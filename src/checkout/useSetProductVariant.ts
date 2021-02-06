import { useContext } from 'react';
import useCommerce from '../useCommerce';
import { CheckoutContext } from './CheckoutProvider';

export default function useSetProductVariant() {
  const commerce = useCommerce();
  const { checkout, updateLive } = useContext(CheckoutContext);

  return (variantId: string, optionId: string) => (
    commerce.checkout.checkVariant(
      checkout.id,
      checkout.live.line_items[0].id,
      {
        variant_id: variantId,
        option_id: optionId
      }
    ).then((result: any) => {
      updateLive(result.live);
      return result;
    })
  );
}
