import express from "express";
import { StripeAPIKEYPRIVATE } from "../config.js";
import stripe from "stripe";

const router = express.Router();
const stripeInstance = stripe(StripeAPIKEYPRIVATE);


router.post("/", async (req, res) => {
  try {
    
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.lineItems,
      success_url: "http://localhost:5173/success",
      cancel_url: `http://localhost:5173/`
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).send(err.message);
  }
});

export default router;
