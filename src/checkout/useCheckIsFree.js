import { useContext } from 'react';
import { CheckoutContext } from './CheckoutProvider';
import useCommerce from '../useCommerce';

export default function useCheckIsFree() {
  const commerce = useCommerce();
  const { checkout } = useContext(CheckoutContext);

  if (!checkout || !commerce) {
    return null;
  }

  return commerce.checkout.isFree(
    checkout.id,
  ).then((result) => {
    return result;
  });
};
