import { useCallback } from 'react';
import get from 'lodash.get';
import useCommerce from './useCommerce';

export default function useCommerceSwrFetcher() {
  const commerce = useCommerce();

  return useCallback((argument) => {
    if (!commerce || Object.keys(commerce).length === 0) {
      return null;
    }

    let method = argument;
    let args = [];
    if (Array.isArray(argument)) {
      [method, ...args] = argument;
    }

    const feature = method.substring(0, method.lastIndexOf('.'));

    if (!feature) {
      throw new Error(`The given method (${method}) is not part of a feature available in Commerce.js`);
    }

    const func = get(commerce, method).bind(get(commerce, feature));

    if (!func) {
      throw new Error(`The given method (${method}) is not supported by Commerce.js`);
    }

    return func(...args);
  }, [commerce]);
}
