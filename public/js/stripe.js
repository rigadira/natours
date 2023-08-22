/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';
import { loadStripe } from '@stripe/stripe-js';

export const bookTour = async (tourId) => {
  const stripe = await loadStripe(
    'pk_test_51NhSEVHfEVMEfagn96v9mYxIXBi7ODEtHAnGN6dh3h1snAfyJOlbyQkdZhqnze66RgCUGZIHwegpUkVXnB9FgJUt006hn0TO6H',
  );

  try {
    // 1) Get Checkout session
    const response = await axios.get(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );
    const session = response.data.session;

    // console.log(session);
    //2) Redirect to checkout form
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error');
  }
};
