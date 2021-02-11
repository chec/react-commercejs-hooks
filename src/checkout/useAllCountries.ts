import { useContext, useEffect } from 'react';
import useCommerce from '../useCommerce';
import { CheckoutContext } from "./CheckoutProvider";

export default function useAllCountries() {
  const commerce = useCommerce();
  const { countries, setCountries } = useContext(CheckoutContext);

  useEffect(() => {
    if (!commerce || countries !== undefined) {
      return;
    }

    // Set an initial value for countries to prevent more than one instance of this hook queuing the same API call
    setCountries([]);

    commerce.services.localeListCountries().then((response: any) => {
      setCountries(response.countries)
    });
  }, [commerce]);

  return countries;
}
