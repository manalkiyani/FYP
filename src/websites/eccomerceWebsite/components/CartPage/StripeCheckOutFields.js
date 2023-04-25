import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { Alert } from "bootstrap";
import { useState } from "react";

export const StripeCheckOutFields = ({cancelDisable, setCancelDisable, PlaceOrderDisable, setPlaceOrderDisable}) => {
  const stripe = useStripe();
  const elements = useElements();
  console.log(typeof(setPlaceOrderDisable));


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:8800/api/products/stripe/charge",
          {
            amount: 999,
            id: id,
          }
        );
        if(response.data.success){
          console.log("in first success "+ response.data.success);
          await setPlaceOrderDisable(false)
          await setCancelDisable(true);
          
        }

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {

          
          console.log("CheckoutForm.js 25 | payment successful!");
          

        }
      } catch (error) {
       
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      <CardElement />
      <button onClick={handleSubmit}>Pay</button>
      </>
  );
};
export default StripeCheckOutFields;