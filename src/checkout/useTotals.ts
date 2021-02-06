import useCheckout from './useCheckout';

export default function useTotals() {
  const checkout = useCheckout();

  if (!checkout) {
    return false;
  }

  const {
    subtotal,
    total,
    total_due: totalDue,
    total_with_tax: totalWithTax,
    tax,
  } = checkout.live;

  return {
    subtotal,
    total,
    totalWithTax,
    totalDue,
    tax,
  };
}
