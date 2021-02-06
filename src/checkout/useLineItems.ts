import useCheckout from './useCheckout';

export default function useLineItems(): any[] {
  const checkout = useCheckout();
  return checkout?.live?.line_items || [];
}

