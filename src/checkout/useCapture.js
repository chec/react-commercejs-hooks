import { useContext } from 'react';
import { CheckoutContext } from './CheckoutProvider';
import useCommerce from '../useCommerce';

export default function useCapture() {
  const commerce = useCommerce();
  const { checkout, createCheckout } = useContext(CheckoutContext);

  return (detail, setServerErrors) => commerce.checkout.capture(checkout.id, detail)
    .then((response) => {
      createCheckout();
      return response;
    })
    .catch((error) => {
      // It might be nested objects referencing specific fields,
      // and an array of error messages
      if (error.statusCode === 422 && typeof error?.data?.error?.errors !== 'undefined') {
        const errors = Object.values(error.data.error.errors).reduce((acc, value) => {
          value.map((error) => acc.push(error));
          return acc;
        })
        setServerErrors(errors);
        return;
      }
      // Sometimes it will be a flat string error eg. 402 errors
      if (typeof error.data.error.message !== 'undefined') {
        setServerErrors([error.data.error.message]);
        return;
      }
      // Some other kind of exception, e.g. server error
      setServerErrors(['Something went wrong, please try again.']);
    });
}
