import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';

export default function useAllCountries() {
  const [countries, setCountries] = useState<object[]>();
  const commerce = useCommerce();

  useEffect(() => {
    if (!commerce) {
      return;
    }

    commerce.services.localeListCountries().then((response: any) => setCountries(response.countries));
  }, [commerce]);

  return countries;
}
