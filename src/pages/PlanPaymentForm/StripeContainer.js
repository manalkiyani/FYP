import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckOutFields from "./StripeCheckOutFields"

const PUBLIC_KEY = "pk_test_51LYTRCIWjxgRh5rlOCsA7IXhdT5uW8w7MdD1AJqXc5pASjH4DT89VPPI4nZyMZJV6tMhLombDhrqN7iwuddciyIR00LGIZmkug";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({cancelDisable, setCancelDisable, PlaceOrderDisable, setPlaceOrderDisable}) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <StripeCheckOutFields cancelDisable={cancelDisable} setCancelDisable={setCancelDisable} PlaceOrderDisable={PlaceOrderDisable} setPlaceOrderDisable={setPlaceOrderDisable} />
    </Elements>
  );
};

export default StripeContainer;