import React from 'react';
import CommerceContext from './CommerceContext';
import Commerce from '@chec/commerce.js';

export default function ({ children, publicKey, debug = false, options = {} }) {
  const sdk = new Commerce(publicKey, debug, options);

  return (
    <CommerceContext.provider value={sdk}>
      { children }
    </CommerceContext.provider>
  );
}
