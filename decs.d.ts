declare module 'create-shared-react-context' {
  import type { Context } from 'react'

  export default function<CustomContext> (context: CustomContext, name: string): Context<CustomContext>;
}

declare module '@chec/commerce.js';
