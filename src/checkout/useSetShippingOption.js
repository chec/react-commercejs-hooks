import { useContext } from 'react';
import useCommerce from '../useCommerce';
import { CheckoutContext } from './CheckoutProvider';

// TODO: Does this need to be a hook? Should we use `useCallback`?
export default function useSetShippingOption() {
  const commerce = useCommerce();
  const { checkout, updateLive } = useContext(CheckoutContext);

  return (shippingOption, country, region = null) => (
    commerce.checkout.checkShippingOption(checkout.id, {
      shipping_option_id: shippingOption,
      country,
      region,
    }).then((result) => {
      updateLive(result.live);
      return result;
    })
  );
}
