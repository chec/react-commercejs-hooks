import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useShippingCountries() {
  const [countries, setCountries] = useState();
  const commerce = useCommerce();
  const checkout = useCheckout();

  useEffect(async () => {
    if (!checkout || !commerce) {
      return;
    }

    const response = await commerce.services.localeListShippingCountries(checkout.id);

    setCountries(response.countries);
  }, [checkout && checkout.id]);

  return countries;
}
