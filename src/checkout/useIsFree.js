import { useEffect, useState } from 'react';
import useCommerce from '../useCommerce';
import useCheckout from './useCheckout';

export default function useIsFree() {
  const commerce = useCommerce();
  const checkout = useCheckout();
  const [isFree, setIsFree] = useState(null);

  useEffect(async () => {
    if (!commerce || !checkout) {
      setIsFree(null);
      return;
    }

    setIsFree(await commerce.checkout.isFree(checkout.id).then((response) => response.is_free));
  }, [commerce, checkout]);

  return isFree;
};
