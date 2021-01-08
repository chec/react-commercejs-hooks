import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useAllCountries() {
  const [countries, setCountries] = useState();
  const commerce = useCommerce();
  const checkout = useCheckout();

  useEffect(async () => {
    if (!commerce) {
      return;
    }

    const response = await commerce.services.localeListCountries();

    setCountries(response.countries);
  }, [checkout]);

  return countries;
}
