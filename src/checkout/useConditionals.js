import useCheckout from './useCheckout';

export default function useConditionals() {
  const checkout = useCheckout();

  if (!checkout) {
    return {};
  }

  const { conditionals, has, is, collects } = checkout;

  return {
    ...conditionals,
    collects,
    is,
    has,
  };
}
