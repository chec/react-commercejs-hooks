import useCheckout from './useCheckout';

export default function useShippingSummary() {
  const checkout = useCheckout();

  if (!checkout) {
    return false;
  }

  const { shipping } = checkout.live;

  return shipping;
}
