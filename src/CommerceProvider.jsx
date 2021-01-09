import React from 'react';
import CommerceContext from './CommerceContext';
import Commerce from '@chec/commerce.js';

export default function CommerceProvider ({ children, publicKey, debug = false, options = {} }) {
  const sdk = new Commerce(publicKey, debug, options);

  return (
    <CommerceContext.Provider value={sdk}>
      { children }
    </CommerceContext.Provider>
  );
}
