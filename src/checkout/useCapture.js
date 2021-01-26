import { useContext } from 'react';
import { CheckoutContext } from './CheckoutProvider';
import useCommerce from '../useCommerce';

export default function useCapture() {
  const commerce = useCommerce();
  const { checkout, createCheckout } = useContext(CheckoutContext);

  return (detail) => commerce.checkout.capture(checkout.id, detail)
    .then((response) => {
      createCheckout();
      return response;
    });
}
