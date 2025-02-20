"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Layout from "@/components/layout/Layout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Stripe from 'stripe';

const stripePromise = loadStripe("pk_test_51NxmUQJSn6JcxC7VDw4gyCb87TBzvEkx9Hz7UCEe2LfIAFA2L4mujdRRPfOXxmMZ63SyrobzYxnmWlRswjjr2k9z00k4AvAifs");
const stripe = new Stripe('sk_test_51NxmUQJSn6JcxC7Vt2kGKXaaA7maL4adID8CeHF5UrllHiwXX1o4T4y47pP9LlUQfGKL8K62zm1Vu3crspfqEUP400DReYLtTk');


export default function Home() {
  const [subscriptionPlan, setSubscriptionPlan] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [membershipPrice, setMembershipPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState(null);

  // Function to get a cookie value by name
  const getCookie = (name) => {
    if (typeof window !== "undefined") {
      // Only access document.cookie in the browser
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    return null;
  };
  
  const email = getCookie("email");
  console.log("User Email:", email);

  useEffect(() => {
    fetchPlans();
    if (email) fetchProfile();
  }, [email]);

  // Fetch subscription plans from the API
  const fetchPlans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1337/api/subscription-plans?populate=plan_image"
      );

      const planData = response.data.data.map((plan) => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        price: plan.price,
        time_period_months: plan.time_period_months,
        plan_image: plan.plan_image?.data
          ? [{ url: `http://localhost:1337${plan.plan_image.data[0]?.url}` }]
          : [],
      }));

      setSubscriptionPlan(planData);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  // Fetch user profile to get profile ID and membership balance
  const fetchProfile = async () => {
    try {
      if (!email) {
        console.error("No email found in cookies!");
        return;
      }

      const response = await axios.get(
        `http://localhost:1337/api/profiles?filters[user][$eq]=${email}`
      );

      const profileData = response.data.data;

      if (profileData.length === 0) {
        console.error("No profile found for the given email!");
        return;
      }

      // Extract first profile document (assuming one profile per user)
      const profile = profileData[0];

      setProfileId(profile.documentId);
      setMembershipPrice(profile.membership_balance || 0);

      console.log("Profile ID:", profile.documentId);
      console.log("Membership Balance:", profile.membership_balance);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const createPaymentIntent = async (plan) => {
    try {
      const response = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer sk_test_51NxmUQJSn6JcxC7Vt2kGKXaaA7maL4adID8CeHF5UrllHiwXX1o4T4y47pP9LlUQfGKL8K62zm1Vu3crspfqEUP400DReYLtTk`, // Use environment variable
        },
        body: new URLSearchParams({
          amount: plan.price * 100, // Convert to cents
          currency: "usd",
          description: plan.name,
        }),
      });
  
      const data = await response.json();
  
      if (data.error) {
        console.error("Error creating payment intent:", data.error);
        return;
      }
  
      console.log("Client Secret:", data.client_secret);
      setClientSecret(data.client_secret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) return;
    
      try {
        // Confirm the payment but do NOT auto-redirect yet
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          redirect: "if_required", // Prevents automatic redirection
        });
    
        if (error) {
          console.error("Error confirming payment:", error);
          alert("Payment failed!");
          return;
        }
    
        // Ensure payment is successful before proceeding
        if (paymentIntent.status !== "succeeded") {
          console.error("Payment not successful:", paymentIntent);
          alert("Payment not successful. Please try again.");
          return;
        }
    
        console.log("Transaction successful:", paymentIntent);
    
        // Calculate start and end dates for subscription
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + selectedPlan.time_period_months);
    
        if (!profileId) {
          console.error("User document ID not found!");
          alert("User authentication issue. Please log in again.");
          return;
        }
    
        // Create the subscription object
        const subscriptionData = {
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          subscription_fee: selectedPlan.price,
          user: email,
          payment_type: "Stripe Payment"
        };
    
        // Send subscription data to backend
        const response = await axios.post("http://localhost:1337/api/subscriptions", {
          data: subscriptionData,
        });
    
        // Update user's membership balance
        const totalBalance = membershipPrice + selectedPlan.price;
        const membershipUpdate = {
          membership_balance: totalBalance,
        };
    
        await axios.put(`http://localhost:1337/api/profiles/${profileId}`, {
          data: membershipUpdate,
        });
    
        console.log("Subscription successfully added:", response.data);
        console.log("Profile Updated with new membership balance:", totalBalance);
        alert("Subscription successfully");
    
        // ✅ Manually redirect after all updates are complete
        window.location.href = `${window.location.origin}/profile`;
    
      } catch (error) {
        console.error("Error processing subscription:", error);
        alert("Payment was successful, but subscription could not be created.");
      }
    };
    
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">Secure Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
            <PaymentElement className="stripe-input" />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-[#635bff] hover:bg-[#5046e5] text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-md disabled:opacity-50"
          >
            Pay Securely
          </button>
        </form>
      </div>
    </div>
    );
  }


  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Subscription">
        <div>
          <section className="blog-page">
            <div className="container">
              <div className="row">
                {subscriptionPlan.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`col-xl-4 col-lg-4 col-md-6 wow fadeIn${
                      index % 3 === 0 ? "Left" : index % 3 === 1 ? "Up" : "Right"
                    }`}
                    data-wow-delay={`${(index + 1) * 100}ms`}
                  >
                    <div className="blog-one__single">
                      <div className="blog-one__img">
                        <img
                          src={
                            plan.plan_image[0]?.url ||
                            "/assets/images/blog/blog-1-1.png"
                          }
                          alt={plan.name}
                        />
                      </div>
                      <div className="blog-one__content">
                        <ul className="blog-one__meta list-unstyled">
                          <li><a href="#">{plan.name}</a></li>
                          <li><a href="#">{plan.description}</a></li>
                        </ul>
                        <h3 className="blog-one__title">{plan.time_period_months} Months</h3>
                        <h3 className="blog-one__title">${plan.price}</h3>
                        <div className="blog-one__btn-box-two">
                          <button
                            className="blog-one__btn-2 thm-btn"
                            onClick={() => {
                              setSelectedPlan(plan);
                              createPaymentIntent(plan);}}
                          >
                            Subscribe
                            <span className="icon-arrow-right"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PayPal Checkout */}
              {selectedPlan && (
                <div className="paypal-container">
                  <h3>Complete Payment for {selectedPlan.name}</h3>
                  <br/>
                  <h5>Complete Payment with Stripe payment</h5>
                  <br/>
                  <img
                    src="/assets/images/resources/event-details-img-box-img-1.png"
                    alt=""
                    width="180"  // Set width to 410px
    height="100"  // Set height to 240px
                  />
                  {/* Stripe Checkout Button */}
                  {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}

<h5>Complete Payment with Paypal payment</h5>
<br/>
<img
                    src="/assets/images/resources/event-details-img-box-img-21.jpg"
                    alt=""
                    width="180"  // Set width to 410px
    height="100"  // Set height to 240px
                  />
                  <br/>
                  <br/>
          
                  <PayPalScriptProvider
                    options={{
                      "client-id": "AYwP3fdXqQXLwOEm5ZlcdhucyoS3pWvcRfqZcSdmwweLZzYmsCr7jtEE1m9z6KXBHL0IwS9svhMyUXzL",
                      currency: "USD",
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                currency_code: "USD",
                                value: selectedPlan.price,
                              },
                              description: selectedPlan.name,
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        try {
                          const order = await actions.order.capture();
                          console.log("Transaction successful:", order);

                          // Calculate start and end dates
                          const startDate = new Date();
                          const endDate = new Date(startDate);
                          endDate.setMonth(endDate.getMonth() + selectedPlan.time_period_months);

                          if (!profileId) {
                            console.error("User document ID not found!");
                            alert("User authentication issue. Please log in again.");
                            return;
                          }

                          // Create the subscription object
                          const subscriptionData = {
                            start_date: startDate.toISOString(),
                            end_date: endDate.toISOString(),
                            subscription_fee: selectedPlan.price,
                            user: email,
                            payment_type: "Paypal Payment"
                          };

                          // Send subscription data to backend
                          const response = await axios.post("http://localhost:1337/api/subscriptions", {
                            data: subscriptionData
                          });

                          // Update user's membership balance
                          const totalBalance = membershipPrice + selectedPlan.price;
                          const membershipUpdate = {
                            membership_balance: totalBalance
                          };

                          await axios.put(`http://localhost:1337/api/profiles/${profileId}`, {
                            data: membershipUpdate
                          });

                          console.log("Subscription successfully added:", response.data);
                          console.log("Profile Updated with new membership balance:", totalBalance);
                          alert(`Payment successful for ${selectedPlan.name}! Subscription activated.`);
                          
                        } catch (error) {
                          console.error("Error processing subscription:", error);
                          alert("Payment was successful, but subscription could not be created.");
                        }
                      }}
                      onError={(err) => {
                        console.error("PayPal Checkout error:", err);
                        alert("Payment failed!");
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
