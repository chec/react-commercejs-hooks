import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useShippingSubdivisions(countryCode: string) {
  const [subdivisions, setSubdivisions] = useState<any[]|null>();
  const commerce = useCommerce();
  const checkout = useCheckout();

  useEffect(() => {
    if (!checkout || !commerce) {
      return;
    }

    if (!countryCode) {
      setSubdivisions(null);
      return;
    }

    commerce.services.localeListShippingSubdivisions(
      checkout.id,
      countryCode
    ).then((response: any) => setSubdivisions(response.subdivisions));
  }, [countryCode])

  return subdivisions;
}
