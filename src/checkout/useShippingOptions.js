import { useEffect, useState, useRef } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useShippingOptions(country, region) {
  const [options, setOptions] = useState(null);
  const checkout = useCheckout();
  const commerce = useCommerce();
  const previousArgs = useRef();

  useEffect(() => {
    if (!commerce || !checkout || typeof country !== 'string' || country === '') {
      return;
    }

    if (previousArgs.current) {
      const prevCountry = previousArgs.current.country;
      const prevRegion = previousArgs.current.region;

      if (prevCountry !== country && prevRegion === region) {
        setOptions(null);
        previousArgs.current = { country, region };
        return;
      }
    }

    previousArgs.current = { country, region };

    commerce.checkout.getShippingOptions(checkout.id, {
      country,
      region,
    })
      .then(setOptions)
      .catch(({statusCode}) => {
        // If doesnt exist, set to null.
        if (statusCode === 404) {
          setOptions(null);
        }
      })
  }, [commerce, checkout, country, region]);

  return options;
}
