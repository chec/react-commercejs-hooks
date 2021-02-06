import React, { ReactChildren, ReactChild } from 'react';
import CommerceContext from './CommerceContext';
import Commerce from '@chec/commerce.js';

export default function CommerceProvider ({
  children,
  publicKey,
  debug = false,
  options = {}
}: {
  children: ReactChildren | ReactChild,
  publicKey: string,
  debug: boolean,
  // TODO use commerce.js options type when available
  options: object,
}) {
  const sdk = new Commerce(publicKey, debug, options);

  return (
    <CommerceContext.Provider value={sdk}>
      { children }
    </CommerceContext.Provider>
  );
}
