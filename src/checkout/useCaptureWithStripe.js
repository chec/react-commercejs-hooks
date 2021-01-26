import { useCallback } from 'react';
import useCapture from './useCapture';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

export default function useCaptureWithStripe() {
  const capture = useCapture();
  const [stripe, elements] = (() => {
    try {
      return [useStripe(), useElements()];
    } catch (err) {
      return [];
    }
  })()

  return useCallback(async (detail) => {
    const card = elements.getElement(CardElement);
    const paymentMethodResponse = await stripe.createPaymentMethod({ type: 'card', card });

    if (paymentMethodResponse.error) {
      throw paymentMethodResponse.error;
    }

    try {
      return await capture({
        ...detail,
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethodResponse.paymentMethod.id,
          },
        },
      });
    } catch (response) {
      // Check if we should rethrow the error if it's not related to 3DS issues
      if (response.statusCode !== 402 || response.data.error.type !== 'requires_verification') {
        throw response;
      }

      const cardActionResult = await stripe.handleCardAction(response.data.error.param);

      return capture({
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_intent_id: cardActionResult.paymentIntent.id,
          },
        },
      });
    }
  }, [stripe, elements])
}
