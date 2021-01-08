import React from 'react';
import { createContext, useEffect, useState } from 'react';
import useCommerce from '../useCommerce';

export const CheckoutContext = createContext({});

export default function CheckoutProvider({ children, id, type = 'cart' }) {
  const commerce = useCommerce();
  const [checkout, setCheckout] = useState();
  const createCheckout = async () => setCheckout(await commerce.checkout.generateTokenFrom(type, id));

  useEffect(async () => {
    // Cancel this side-effect if the ID is invalid
    if (typeof id !== 'string' || id === '' || !commerce) {
      return;
    }
    return createCheckout();
  }, [id, type, commerce]);

  const updateLive = (live) => {
    setCheckout({
      ...checkout,
      live,
    });
  }

  return (
    <CheckoutContext.Provider value={{ checkout, updateLive, createCheckout }}>
      { children }
    </CheckoutContext.Provider>
  );
};
