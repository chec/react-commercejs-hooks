import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useIsFree(): boolean|null {
  const commerce = useCommerce();
  const checkout = useCheckout();
  const [isFree, setIsFree] = useState<boolean|null>(null);

  useEffect(() => {
    if (!commerce || !checkout) {
      setIsFree(null);
      return;
    }

    commerce.checkout.isFree(checkout.id).then((response: any) => setIsFree(response.is_free));
  }, [commerce, checkout]);

  return isFree;
};
