import React, {ReactChild, ReactChildren} from 'react';
import { createContext, useEffect, useState } from 'react';
import useCommerce from '../useCommerce';

export interface CheckoutContextInterface {
  // TODO replace with checkout type from Commerce.js
  checkout: any,
  updateLive: Function,
  createCheckout: Function,
  countries: object[]|undefined,
  setCountries: Function,
}

export const CheckoutContext = createContext<CheckoutContextInterface>({
  checkout: undefined,
  updateLive: () => {},
  createCheckout: () => {},
  countries: undefined,
  setCountries: () => {},
});

export enum CheckoutIdType {
  CartId = 'cart',
  ProductPermalink = 'permalink',
  ProductId = 'product_id',
}

export default function CheckoutProvider(
  {
    children,
    id,
    type = CheckoutIdType.CartId
  }: {
    children: ReactChildren | ReactChild,
    id: string,
    type: CheckoutIdType
  }
) {
  const commerce = useCommerce();
  const [checkout, setCheckout] = useState<object|undefined>();
  const [countries, setCountries] = useState<object[]>();
  const createCheckout = async () => setCheckout(await commerce.checkout.generateTokenFrom(type, id));

  useEffect(() => {
    // Cancel this side-effect if the ID is invalid
    if (!id || !commerce) {
      return;
    }

    createCheckout();
  }, [id, type, commerce]);

  const updateLive = (live: any) => {
    if (typeof checkout !== 'object') {
      return;
    }

    setCheckout({
      ...checkout,
      live,
    });
  }

  return (
    <CheckoutContext.Provider value={{
      checkout,
      updateLive,
      createCheckout,
      countries,
      setCountries,
    }}>
      { children }
    </CheckoutContext.Provider>
  );
};
