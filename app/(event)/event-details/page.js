"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Stripe from 'stripe';

import Layout from "@/components/layout/Layout";

const stripePromise = loadStripe("pk_test_51NxmUQJSn6JcxC7VDw4gyCb87TBzvEkx9Hz7UCEe2LfIAFA2L4mujdRRPfOXxmMZ63SyrobzYxnmWlRswjjr2k9z00k4AvAifs");

export default function Home() {
  const [eventDetails, setEventDetails] = useState([]); // Ensure it's an array
  const [membershipPrice, setMembershipPrice] = useState(0);
  const [profileId, setProfileId] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedStripeTicket, setSelectedStripeTicket] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [hostContactNumber, setHostContactNumber] = useState();

  const searchParams = useSearchParams();
  const documentId = searchParams.get("documentId");

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
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/events?populate=event_image"
        );

        // Map the fetched data to match the event structure
        const eventsData = response.data.data.map((event) => ({
          id: event.id,
          documentId: event.documentId,
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
          ticket_price: event.ticket_price,
          seat_capacity: event.seat_capacity,
          seat_availability: event.seat_availability,
          is_premium: event.is_premium,
          is_live_stream: event.is_live_stream,
          event_image: event.event_image
            ? [{ url: `http://localhost:1337${event.event_image[0]?.url}` }]
            : [],
        }));

        // Filter the event matching the documentId
        const filteredEvent = eventsData.find(
          (event) => event.documentId === documentId
        );

        console.log("Filtered Event:", filteredEvent);

        setEventDetails(filteredEvent ? [filteredEvent] : []); // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (documentId) {
      fetchEvents();
    }

    fetchHost();
    fetchProfile();
  }, [documentId]);

  const fetchHost = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/hosts?filters[user][$eq]=${email}`);
      console.log(response);

      const hostData = response.data.data;

      if (hostData.length === 0) {
        console.error("No host found for the given email!");
        return;
      }

      const host = hostData[0];

      setHostContactNumber(host.contact_info);
      console.log("host contact number",host.contact_info);
      
    } catch (error) {
      console.error('Error fetching host:', error);
    }
  }

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

      console.log("Membership Balance:", profile.membership_balance);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdateMembership = async (ticket_price, event) => {
    if (membershipPrice < ticket_price) {
      alert("Insufficient balance to buy this ticket!");
      return;
    }

    const isConfirmed = confirm(
      `Are you sure you want to buy this ticket for $${ticket_price}?`
    );
    if (!isConfirmed) return;

    const newBalance = membershipPrice - ticket_price;
    setMembershipPrice(newBalance);

    try {
      await axios.put(
        `http://localhost:1337/api/profiles/${profileId}`,
        {
          data: { membership_balance: newBalance },
        }
      );

      const purchaseDate = new Date().toISOString();

      await axios.post("http://localhost:1337/api/tickets", {
        data: {
          user: email,
          event: event.documentId,
          price: event.ticket_price,
          purchase_date: purchaseDate,
        },
      });

      alert("Ticket purchased successfully!");
    } catch (error) {
      console.error("Error updating membership or creating ticket:", error);
    }
  };

  const createPaymentIntent = async (event) => {
    try {
      const response = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer sk_test_51NxmUQJSn6JcxC7Vt2kGKXaaA7maL4adID8CeHF5UrllHiwXX1o4T4y47pP9LlUQfGKL8K62zm1Vu3crspfqEUP400DReYLtTk`, // Use environment variable
        },
        body: new URLSearchParams({
          amount: event.ticket_price, // Convert to cents
          currency: "usd",
          description: event.title,
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
    
        // Create the ticket after successful payment
                          const purchaseDate = new Date().toISOString();
                          const ticketData = {
                            data: {
                              user: email, // Using email as user identifier
                              event: selectedStripeTicket.documentId, // Use event documentId
                              price: selectedStripeTicket.ticket_price,
                              purchase_date: purchaseDate,
                            },
                          };
              
                          const response = await axios.post(
                            "http://localhost:1337/api/tickets",
                            ticketData
                          );
              
                          console.log("Ticket added successfully:", response.data);
        alert("Ticket purchase successfully");
    
        // ✅ Manually redirect after all updates are complete
        window.location.href = `${window.location.origin}/profile`;
    
      } catch (error) {
        console.error("Error processing subscription:", error);
        alert("Payment was successful, but subscription could not be created.");
      }
    };
    
  
    return (
        <form onSubmit={handleSubmit}>
          <div>
            <PaymentElement/>
          </div>
          <button
            type="submit"
            disabled={!stripe}
          >
            Pay with Stripe
          </button>
        </form>
    );
  }

  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Event Details">
        {/* Blog Details Start */}
        {eventDetails.length > 0 ? (
          eventDetails.map((event, index) => (
            <section className="event-details">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-7">
                <div className="event-details__left">
                  <div className="event-details__img">
                  <img
                            src={
                              event.event_image[0]?.url ||
                              "/assets/images/default-event.jpg"
                            }
                            alt={event.title}
                            style={{
                              width: "850px",
                              height: "397px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />
                  </div>
                  <div className="event-details__main-tab-box tabs-box">
                  <div className="event-details__tab-content-box">
          <ul className="event-details__meta list-unstyled">
            <li>
              <p>
                <span className="icon-clock"></span>
                Event Date and time: {event.date}
              </p>
            </li>
            <li>
              <p>
                <span className="icon-pin"></span>
                Event Location: {event.location}
              </p>
            </li>
          </ul>
          <h3 className="event-details__title-1">
            {event.title}
          </h3>
          <p className="event-details__text-1">
          {event.description}
          </p>
          <div className="event-details__img-box">
            <div className="row">
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src="/assets/images/resources/event-details-img-box-img-1.png"
                    alt=""
                    width="410"  // Set width to 410px
    height="240"  // Set height to 240px
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src="/assets/images/resources/event-details-img-box-img-21.jpg"
                    alt=""
                    width="410"  // Set width to 410px
    height="240"  // Set height to 240px
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="event-details__points-box">
            <ul className="event-details__points list-unstyled">
              <li>
                <div className="icon">
                  <span className="icon-double-angle"></span>
                </div>
                <p>Creating Memories, One Event at a Time</p>
              </li>
              <li>
                <div className="icon">
                  <span className="icon-double-angle"></span>
                </div>
                <p>Celebrate in Style, Celebrate with Class</p>
              </li>
            </ul>
            <ul className="event-details__points list-unstyled">
              <li>
                <div className="icon">
                  <span className="icon-double-angle"></span>
                </div>
                <p>Where Events Come to Life</p>
              </li>
              <li>
                <div className="icon">
                  <span className="icon-double-angle"></span>
                </div>
                <p>Making Your Event Dreams Come True</p>
              </li>
            </ul>
          </div>
          <p className="event-details__text-3">
            Real estate is a lucrative industry that involves the buying selling
            and renting properties It encompasses residential commercial and
            industrial designsin properties. Real estate agents play a crucial
          </p>
          <p className="event-details__text-4">
            Events are special occasions where people gather together to
            celebrate an Events are special occasions where people gather
            together to eommemorate vents are special occasions where people
            gather
          </p>
        </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5">
                <div className="event-details__right">
                  <div className="event-details__speakers">
                    <h3 className="event-details__speakers-title">${membershipPrice}</h3>
                    <p className="event-details__speakers-sub-title">
                      Your subscription balance
                    </p>
                    <p className="event-details__speakers-text">
                      Events are special occasions where people gather together
                      to celebrate...
                    </p>
                  </div>
                  
                  <div className="event-details__ticket-two">
                    <h3 className="event-details__ticket-two-title">
                      ${event.ticket_price}
                    </h3>
                    <p className="event-details__ticket-two-text">
                      This is your ticet price. Buy the ticket and enjoy your movment
                      Events are special occasions where people gather together
                      to celebrate...
                    </p>
                    <div className="event-details__ticket-two-btn-box">
                    <button
                          className="event-details__ticket-two-btn thm-btn"
                          onClick={() => handleUpdateMembership(event.ticket_price, event)}
                        >
                          Buy Ticket with subscription
                        </button>
                      <br/><br/>
                      <button
                        href="#"
                        className="event-details__ticket-two-btn thm-btn"
                        onClick={() => setSelectedTicket(event)}
                      >
                        Buy Ticket with Paypal
                      </button>
                      <br/><br/>
                      {/* PayPal Checkout */}
          {selectedTicket && (
                <div className="paypal-container">
                  <h3>Complete Payment</h3>
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
                                value: selectedTicket.ticket_price,
                              },
                              description: selectedTicket.title,
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        try {
                          const order = await actions.order.capture();
                          console.log("Transaction successful:", order);
                          alert(`Payment successful for ${selectedTicket.title}!`);
              
                          // Create the ticket after successful payment
                          const purchaseDate = new Date().toISOString();
                          const ticketData = {
                            data: {
                              user: email, // Using email as user identifier
                              event: selectedTicket.documentId, // Use event documentId
                              price: selectedTicket.ticket_price,
                              purchase_date: purchaseDate,
                            },
                          };
              
                          const response = await axios.post(
                            "http://localhost:1337/api/tickets",
                            ticketData
                          );
              
                          console.log("Ticket added successfully:", response.data);
                          alert("Ticket has been added successfully!");
                        } catch (error) {
                          console.error("Error adding ticket:", error);
                          alert("Payment was successful, but ticket creation failed!");
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
              <button 
                        href="#"
                        className="event-details__ticket-two-btn thm-btn"
                        onClick={() => {createPaymentIntent(event);
                        setSelectedStripeTicket(event);}}
                      >
                        Buy Ticket with Stripe
                      </button>
                      <br/><br/>
                        {/* Stripe Checkout Button */}
                  {clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckoutForm />
                    </Elements>
                  )}
                    </div>
                  </div>
                  <div className="event-details__ticket">
                    <h3 className="event-details__ticket-title">
                      Don’t have a ticket?
                    </h3>
                    <p className="event-details__ticket-sub-title">
                      Call Us Now
                    </p>
                    <div className="event-details__ticket-icon">
                      <span className="icon-call"></span>
                    </div>
                    <p className="event-details__ticket-sub-title-2">
                      For fast service
                    </p>
                    <h3 className="event-details__ticket-number">
                      <a>{hostContactNumber}</a>
                    </h3>
                  </div>
                  <div className="event-details__follow-us">
                    <h3 className="event-details__follow-us-title">
                      Follow Us
                    </h3>
                    <div className="event-details__follow-us-social">
                      <a href="#">
                        <span className="icon-instagram"></span>
                      </a>
                      <a href="#">
                        <span className="icon-facebook"></span>
                      </a>
                      <a href="#">
                        <span className="icon-fi"></span>
                      </a>
                      <a href="#">
                        <span className="icon-linkedin-in"></span>
                      </a>
                    </div>
                  </div>
                  <div className="event-details__location">
                    <h3 className="event-details__location-title">Location</h3>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d-118.80123790098536!3d34.152323469614075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd"
                      className="google-map__one"
                      allowFullScreen
                      title="Event Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
          ))
        ) : (
          <p className="text-center">No event found with the given ID.</p>
        )}
      </Layout>
    </>
  );
}
