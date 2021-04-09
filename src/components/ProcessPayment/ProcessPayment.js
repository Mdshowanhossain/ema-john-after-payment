import React from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import SimplePayment from './SimplePayment';
import SplitCardForm from './SplitCardForm';


const stripePromise = loadStripe('pk_test_51Ie2rWAvQ7Yaog5MOBruMsJ86Qe3OucNYcSCE61BdEzrmep36PJ3ZxG3Ff9Fl2VlcujOQbHle5Xc76ClO8mNKLn500IonStkaz');
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimplePayment handlePayment={handlePayment}>    </SimplePayment >
            {/* <SplitCardForm></SplitCardForm> */}
        </Elements>
    );
};

export default ProcessPayment;