import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useShippingSubdivisions(countryCode) {
  const [subdivisions, setSubdivisions] = useState();
  const commerce = useCommerce();
  const checkout = useCheckout();

  useEffect(async () => {
    if (!checkout || !commerce) {
      return;
    }

    if (!countryCode) {
      setSubdivisions(null);
      return;
    }

    const response = await commerce.services.localeListShippingSubdivisions(
      checkout.id,
      countryCode
    );

    setSubdivisions(response.subdivisions);
  }, [countryCode])

  return subdivisions;
}
