import { loadStripe } from "@stripe/stripe-js";
import { StripeAPIKEYPUBLIC } from "../../backend/config";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(StripeAPIKEYPUBLIC);
  }
  return stripePromise;
};

export default getStripe;
