import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useShippingCountries() {
  const [countries, setCountries] = useState();
  const commerce = useCommerce();
  const checkout = useCheckout();

  useEffect(() => {
    if (!checkout || !commerce) {
      return;
    }

    commerce.services.localeListShippingCountries(checkout.id)
      .then((response: any) => setCountries(response.countries))
  }, [checkout]);

  return countries;
}
