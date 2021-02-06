import { useEffect, useState, useRef } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useShippingOptions(country: string, region: string|undefined) {
  const [options, setOptions] = useState<any[]|null>(null);
  const checkout = useCheckout();
  const commerce = useCommerce();
  const previousArgs = useRef<{ country: string, region: string|undefined }|null>(null);

  useEffect(() => {
    if (!commerce || !checkout || !country) {
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
      .catch(({ statusCode }: { statusCode: number }) => {
        // If doesnt exist, set to null.
        if (statusCode === 404) {
          setOptions(null);
        }
      });
  }, [commerce, checkout, country, region]);

  return options;
}
