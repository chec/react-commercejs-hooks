import { useContext } from 'react';
import { CheckoutContext } from './CheckoutProvider';

export default function useRegenerateCheckout() {
  const { createCheckout } = useContext(CheckoutContext);
  return createCheckout || (() => {});
}
