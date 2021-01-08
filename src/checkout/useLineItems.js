import useCheckout from './useCheckout';

export default function useLineItems() {
  const checkout = useCheckout();
  return checkout?.live?.line_items || [];
}

