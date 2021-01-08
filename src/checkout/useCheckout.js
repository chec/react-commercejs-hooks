import { useContext } from 'react';
import { CheckoutContext } from './CheckoutProvider';

export default function useCheckout() {
  return useContext(CheckoutContext).checkout;
}
