import { useCallback } from 'react';
import useCapture from './useCapture';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { StripeElements, Stripe } from '@stripe/stripe-js';

export default function useCaptureWithStripe() {
  const capture = useCapture();
  const [stripe, elements] = ((): [stripe: Stripe|null, elements: StripeElements|null] => {
    try {
      return [useStripe(), useElements()];
    } catch (err) {
      return [null, null];
    }
  })()

  return useCallback(async (detail) => {
    if (!stripe || !elements) {
      throw new Error(
        'Stripe is not available. Please ensure that useCaptureWithStripe is only called within ElementsContext',
      );
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      throw new Error(
        'Could not find a CardElement component within this Stripe context. Did you add one?',
      );
    }

    const paymentMethodResponse = await stripe.createPaymentMethod({ type: 'card', card });

    if (paymentMethodResponse.error) {
      throw paymentMethodResponse.error;
    }

    if (!paymentMethodResponse.paymentMethod) {
      throw new Error('Stripe response did not error but also did not provide a payment method');
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

      if (cardActionResult.error) {
        throw cardActionResult.error;
      }

      if (!cardActionResult.paymentIntent) {
        throw new Error('Stripe response did not error but also did not provide a payment intent');
      }

      return capture({
        ...detail,
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
