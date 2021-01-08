import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useShippingOptions(country, region) {
  const [options, setOptions] = useState();
  const checkout = useCheckout();
  const commerce = useCommerce();

  useEffect(async () => {
    if (!commerce || !checkout || typeof country !== 'string' || country === '') {
      return;
    }

    setOptions(await commerce.checkout.getShippingOptions(checkout.id, {
      country,
      region,
    }));
  }, [commerce, checkout && checkout.id, country, region]);

  return options;
}
