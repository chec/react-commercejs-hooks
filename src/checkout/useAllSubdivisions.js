import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';

export default function useAllCountries(countryCode) {
  const [subdivisions, setSubdivisions] = useState();
  const commerce = useCommerce();

  useEffect(async () => {
    if (!commerce) {
      return;
    }

    if (!countryCode) {
      setSubdivisions(null);
      return;
    }

    const response = await commerce.services.localeListSubdivisions(
      countryCode,
    );

    setSubdivisions(response.subdivisions);
  }, [countryCode]);

  return subdivisions;
}
