import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useIsFree(): boolean|null {
  const commerce = useCommerce();
  const checkout = useCheckout();
  const [isFree, setIsFree] = useState<boolean|null>(null);

  useEffect(() => {
    if (!commerce || !checkout?.live?.total) {
      setIsFree(null);
      return;
    }

    const total = checkout.live.total.raw;

    if (typeof total !== 'number') {
      setIsFree(null);
      return;
    }

    setIsFree(total < 0.01);
  }, [commerce, checkout]);

  return isFree;
};
