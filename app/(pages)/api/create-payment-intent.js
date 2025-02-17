// pages/api/create-payment-intent.js

import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51NxmUQJSn6JcxC7Vt2kGKXaaA7maL4adID8CeHF5UrllHiwXX1o4T4y47pP9LlUQfGKL8K62zm1Vu3crspfqEUP400DReYLtTk'); // Replace with your Stripe secret key

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { price, planName } = req.body;
  
      try {
        // Create a PaymentIntent on Stripe
        const paymentIntent = await stripe.paymentIntents.create({
          amount: price * 100, // Convert price to cents
          currency: "usd",
          description: planName,
        });
  
        // Send the clientSecret to the frontend
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  }
  
