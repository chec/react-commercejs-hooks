import useSWR from 'swr';
import useCommerceSwrFetcher from '../useCommerceSwrFetcher';

export default function useCart(cartId) {
  const fetcher = useCommerceSwrFetcher();
  const { data, error } = useSWR(['cart.retrieve', cartId], fetcher);

  if (error) {
    throw error;
  }

  return data;
}
