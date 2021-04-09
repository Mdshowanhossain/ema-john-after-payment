import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const SimplePayment = ({handlePayment}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, SetPaymentError] = useState(null);

  const [paymentSuccess, SetPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      SetPaymentError(error.message)
      SetPaymentSuccess(null)
    } else {
      SetPaymentSuccess(paymentMethod.id);
      SetPaymentError(null)
      handlePayment(paymentMethod.id)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
      {
        paymentError && <p style={{ color: 'red' }}>{paymentError}</p>
      }

      {
        paymentSuccess && <p style={{ color: 'green' }}>Your Payment is Successfully</p>
      }
    </div>
  );
};







export default SimplePayment;