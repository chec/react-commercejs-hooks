import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';

export default function useAllSubdivisions(countryCode: string) {
  const [subdivisions, setSubdivisions] = useState<any[]|null>();
  const commerce = useCommerce();

  useEffect(() => {
    if (!commerce) {
      return;
    }

    if (!countryCode) {
      setSubdivisions(null);
      return;
    }

    commerce.services.localeListSubdivisions(
      countryCode,
    ).then((response: any) => setSubdivisions(response.subdivisions));
  }, [countryCode]);

  return subdivisions;
}
