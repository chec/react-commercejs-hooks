import { useEffect, useRef, useState } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useLocationFromIp(ipAddress = '') {
  const commerce = useCommerce();
  const checkout = useCheckout();
  const [location, setLocation] = useState(null);
  const previousIpRef = useRef();

  useEffect(async () => {
    if (!commerce || !checkout) {
      setLocation(null);
      return;
    }

    // Don't rerun the side effect if the location has already been fetched (and the IP address hasn't changed)
    if (location && previousIpRef.current === ipAddress) {
      return;
    }

    previousIpRef.current = ipAddress;

    setLocation(await commerce.checkout.getLocationFromIP(checkout.id, ipAddress))
  }, [commerce, checkout, ipAddress]);

  return location;
};
