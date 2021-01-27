import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';

export default function useAllCountries() {
  const [countries, setCountries] = useState();
  const commerce = useCommerce();

  useEffect(async () => {
    if (!commerce) {
      return;
    }

    const response = await commerce.services.localeListCountries();

    setCountries(response.countries);
  }, [commerce]);

  return countries;
}
