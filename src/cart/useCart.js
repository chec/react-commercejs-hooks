import useSWR from 'swr';
import useCommerceSwrFetcher from '../useCommerceSwrFetcher';
import useActiveCartId from './useActiveCartId';

export default function useCart(cartId) {
  const fetcher = useCommerceSwrFetcher();
  const defaultCartId = useActiveCartId();

  // Rely on our own tracking of active cart ID above the logic in `cart.retrieve` itself. See comments in
  // `useActiveCartId` for more details
  const { data, error } = useSWR(['cart.retrieve', cartId || defaultCartId], fetcher);

  if (error) {
    throw error;
  }

  return data;
}
