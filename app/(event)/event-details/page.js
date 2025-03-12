"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import emailjs from "@emailjs/browser";

import Layout from "@/components/layout/Layout";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Home() {
  const [eventDetails, setEventDetails] = useState([]); // Ensure it's an array
  const [membershipPrice, setMembershipPrice] = useState(0);
  const [profileId, setProfileId] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedStripeTicket, setSelectedStripeTicket] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [hostContactNumber, setHostContactNumber] = useState();
  const [buyTicketType, setBuyTicketType] = useState();

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
          vip_seats: event.vip_seats,
          standed_seats: event.standed_seats,
          vip_ticket_price: event.vip_ticket_price,
          standed_ticket_price: event.standed_ticket_price,
          ticket_type: event.ticket_type,
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
      const response = await axios.get(
        `http://localhost:1337/api/hosts?filters[user][$eq]=${email}`
      );
      console.log(response);

      const hostData = response.data.data;

      if (hostData.length === 0) {
        console.error("No host found for the given email!");
        return;
      }

      const host = hostData[0];

      setHostContactNumber(host.contact_info);
      console.log("host contact number", host.contact_info);
    } catch (error) {
      console.error("Error fetching host:", error);
    }
  };

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
    if (buyTicketType === "vip") {
      if (membershipPrice < event.vip_ticket_price) {
        alert("Insufficient balance to buy this ticket!");
        return;
      }

      const isConfirmed = confirm(
        `Are you sure you want to buy this ticket for $${event.vip_ticket_price}?`
      );
      if (!isConfirmed) return;

      const newBalance = membershipPrice - event.vip_ticket_price;
      setMembershipPrice(newBalance);

      const newAvailabbleseat = event.seat_availability - 1;

      const newAvailableVipSeats = event.vip_seats - 1;

      try {
        await axios.put(`http://localhost:1337/api/profiles/${profileId}`, {
          data: { membership_balance: newBalance },
        });

        await axios.put(
          `http://localhost:1337/api/events/${event.documentId}`,
          {
            data: {
              seat_availability: newAvailabbleseat,
              vip_seats: newAvailableVipSeats,
            },
          }
        );

        const purchaseDate = new Date().toISOString();

        await axios.post("http://localhost:1337/api/tickets", {
          data: {
            user: email,
            event: event.documentId,
            price: event.vip_ticket_price,
            purchase_date: purchaseDate,
          },
        });

        // Send Email Invoice via EmailJS
        const emailParams = {
          email_to: email,
          event_name: event.title,
          ticket_type: buyTicketType.toUpperCase(), // "VIP" or "STANDARD"
          price: event.vip_ticket_price,
          purchase_date: purchaseDate,
        };

        emailjs
          .send(
            process.env.PUBLIC_EMAILJS_SERVICE_ID,
            process.env.PAYMENT_PUBLIC_EMAILJS_TEMPLATE_ID,
            emailParams,
            process.env.PUBLIC_EMAILJS_USER_ID
          )
          .then((result) => {
            console.log("Email sent successfully:", result.text);
          })
          .catch((err) => {
            console.error("Error sending email:", err);
          });

        alert("Ticket purchased successfully!");
      } catch (error) {
        console.error("Error updating membership or creating ticket:", error);
      }
    } else {
      if (membershipPrice < event.standed_ticket_price) {
        alert("Insufficient balance to buy this ticket!");
        return;
      }

      const isConfirmed = confirm(
        `Are you sure you want to buy this ticket for $${event.standed_ticket_price}?`
      );
      if (!isConfirmed) return;

      const newBalance = membershipPrice - event.standed_ticket_price;
      setMembershipPrice(newBalance);

      const newAvailabbleseat = event.seat_availability - 1;

      const newAvailableStandedSeats = event.standed_seats - 1;

      try {
        await axios.put(`http://localhost:1337/api/profiles/${profileId}`, {
          data: { membership_balance: newBalance },
        });

        await axios.put(
          `http://localhost:1337/api/events/${event.documentId}`,
          {
            data: {
              seat_availability: newAvailabbleseat,
              standed_seats: newAvailableStandedSeats,
            },
          }
        );

        const purchaseDate = new Date().toISOString();

        await axios.post("http://localhost:1337/api/tickets", {
          data: {
            user: email,
            event: event.documentId,
            price: event.standed_ticket_price,
            purchase_date: purchaseDate,
          },
        });

        // Send Email Invoice via EmailJS
        const emailParams = {
          email_to: email,
          event_name: event.title,
          ticket_type: buyTicketType.toUpperCase(), // "VIP" or "STANDARD"
          price: event.standed_ticket_price,
          purchase_date: purchaseDate,
        };

        emailjs
          .send(
            process.env.PUBLIC_EMAILJS_SERVICE_ID,
            process.env.PAYMENT_PUBLIC_EMAILJS_TEMPLATE_ID,
            emailParams,
            process.env.PUBLIC_EMAILJS_USER_ID
          )
          .then((result) => {
            console.log("Email sent successfully:", result.text);
          })
          .catch((err) => {
            console.error("Error sending email:", err);
          });

        alert("Ticket purchased successfully!");
      } catch (error) {
        console.error("Error updating membership or creating ticket:", error);
      }
    }
  };

  const createPaymentIntent = async (event) => {
    if (buyTicketType === "vip") {
      try {
        const response = await fetch(
          "https://api.stripe.com/v1/payment_intents",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: process.env.STRIPE_AUTHORIZATION, // Use environment variable
            },
            body: new URLSearchParams({
              amount: event.vip_ticket_price, // Convert to cents
              currency: "usd",
              description: event.title,
            }),
          }
        );

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
    } else {
      try {
        const response = await fetch(
          "https://api.stripe.com/v1/payment_intents",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: process.env.STRIPE_AUTHORIZATION, // Use environment variable
            },
            body: new URLSearchParams({
              amount: event.standed_ticket_price, // Convert to cents
              currency: "usd",
              description: event.title,
            }),
          }
        );

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
    }
  };

  function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      if (buyTicketType === "vip") {
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

          const newAvailabbleseat = selectedStripeTicket.seat_availability - 1;
          const newAvailableVipSeats = selectedStripeTicket.vip_seats - 1;

          const ticketData = {
            data: {
              user: email, // Using email as user identifier
              event: selectedStripeTicket.documentId, // Use event documentId
              price: selectedStripeTicket.vip_ticket_price,
              purchase_date: purchaseDate,
            },
          };

          const response = await axios.post(
            "http://localhost:1337/api/tickets",
            ticketData
          );

          await axios.put(
            `http://localhost:1337/api/events/${selectedStripeTicket.documentId}`,
            {
              data: {
                seat_availability: newAvailabbleseat,
                vip_seats: newAvailableVipSeats,
              },
            }
          );

          console.log("Ticket added successfully:", response.data);
          alert("Ticket purchase successfully");

          // Send Email Invoice via EmailJS
          const emailParams = {
            email_to: email,
            event_name: selectedStripeTicket.title,
            ticket_type: buyTicketType.toUpperCase(), // "VIP" or "STANDARD"
            price: selectedStripeTicket.vip_ticket_price,
            purchase_date: purchaseDate,
          };

          emailjs
            .send(
              process.env.PUBLIC_EMAILJS_SERVICE_ID,
              process.env.PAYMENT_PUBLIC_EMAILJS_TEMPLATE_ID,
              emailParams,
              process.env.PUBLIC_EMAILJS_USER_ID
            )
            .then((result) => {
              console.log("Email sent successfully:", result.text);
            })
            .catch((err) => {
              console.error("Error sending email:", err);
            });

          // Manually redirect after all updates are complete
          window.location.href = `${window.location.origin}/profile`;
        } catch (error) {
          console.error("Error processing subscription:", error);
          alert(
            "Payment was successful, but subscription could not be created."
          );
        }
      } else {
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

          const newAvailabbleseat = selectedStripeTicket.seat_availability - 1;
          const newAvailableStandedSeats =
            selectedStripeTicket.standed_seats - 1;

          const ticketData = {
            data: {
              user: email, // Using email as user identifier
              event: selectedStripeTicket.documentId, // Use event documentId
              price: selectedStripeTicket.standed_ticket_price,
              purchase_date: purchaseDate,
            },
          };

          const response = await axios.post(
            "http://localhost:1337/api/tickets",
            ticketData
          );

          await axios.put(
            `http://localhost:1337/api/events/${selectedStripeTicket.documentId}`,
            {
              data: {
                seat_availability: newAvailabbleseat,
                standed_seat: newAvailableStandedSeats,
              },
            }
          );

          console.log("Ticket added successfully:", response.data);
          alert("Ticket purchase successfully");

          // Send Email Invoice via EmailJS
          const emailParams = {
            email_to: email,
            event_name: selectedStripeTicket.title,
            ticket_type: buyTicketType.toUpperCase(), // "VIP" or "STANDARD"
            price: selectedStripeTicket.standed_ticket_price,
            purchase_date: purchaseDate,
          };

          emailjs
            .send(
              process.env.PUBLIC_EMAILJS_SERVICE_ID,
              process.env.PAYMENT_PUBLIC_EMAILJS_TEMPLATE_ID,
              emailParams,
              process.env.PUBLIC_EMAILJS_USER_ID
            )
            .then((result) => {
              console.log("Email sent successfully:", result.text);
            })
            .catch((err) => {
              console.error("Error sending email:", err);
            });

          // ✅ Manually redirect after all updates are complete
          window.location.href = `${window.location.origin}/profile`;
        } catch (error) {
          console.error("Error processing subscription:", error);
          alert(
            "Payment was successful, but subscription could not be created."
          );
        }
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <PaymentElement />
        </div>
        <button type="submit" disabled={!stripe}>
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
                                    width="410" // Set width to 410px
                                    height="240" // Set height to 240px
                                  />
                                </div>
                              </div>
                              <div className="col-xl-6">
                                <div className="event-details__img-box-img">
                                  <img
                                    src="/assets/images/resources/event-details-img-box-img-21.jpg"
                                    alt=""
                                    width="410" // Set width to 410px
                                    height="240" // Set height to 240px
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
                            Real estate is a lucrative industry that involves
                            the buying selling and renting properties It
                            encompasses residential commercial and industrial
                            designsin properties. Real estate agents play a
                            crucial
                          </p>
                          <p className="event-details__text-4">
                            Events are special occasions where people gather
                            together to celebrate an Events are special
                            occasions where people gather together to
                            eommemorate vents are special occasions where people
                            gather
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-5">
                    <div className="event-details__right">
                      <div className="event-details__speakers">
                        <h3 className="event-details__speakers-title">
                          ${membershipPrice}
                        </h3>
                        <p className="event-details__speakers-sub-title">
                          Your subscription balance
                        </p>
                        <p className="event-details__speakers-text">
                          Events are special occasions where people gather
                          together to celebrate...
                        </p>
                      </div>

                      <div className="event-details__ticket-two">
                        {/* if ticket type normal */}
                        {event.ticket_type === "normal" && (
                          <div>
                            <h3 className="event-details__ticket-two-title">
                              ${event.standed_ticket_price}
                            </h3>
                            <p className="event-details__ticket-two-text">
                              This is your ticet price. Buy the ticket and enjoy
                              your movment Events are special occasions where
                              people gather together to celebrate...
                            </p>
                            <div className="event-details__ticket-two-btn-box">
                              <button
                                className="event-details__ticket-two-btn thm-btn"
                                onClick={() =>
                                  handleUpdateMembership(
                                    event.ticket_price,
                                    event
                                  )
                                }
                              >
                                Buy Ticket with subscription
                              </button>
                              <br />
                              <br />
                              <button
                                href="#"
                                className="event-details__ticket-two-btn thm-btn"
                                onClick={() => setSelectedTicket(event)}
                              >
                                Buy Ticket with Paypal
                              </button>
                              <br />
                              <br />
                              {/* PayPal Checkout */}
                              {selectedTicket && (
                                <div className="paypal-container">
                                  <h3>Complete Payment</h3>
                                  <br />
                                  <PayPalScriptProvider
                                    options={{
                                      "client-id": process.env.PAYPAL_CLIENTID,
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
                                                value:
                                                  selectedTicket.standed_ticket_price,
                                              },
                                              description: selectedTicket.title,
                                            },
                                          ],
                                        });
                                      }}
                                      onApprove={async (data, actions) => {
                                        try {
                                          const order =
                                            await actions.order.capture();
                                          console.log(
                                            "Transaction successful:",
                                            order
                                          );
                                          alert(
                                            `Payment successful for ${selectedTicket.title}!`
                                          );

                                          // Create the ticket after successful payment
                                          const purchaseDate =
                                            new Date().toISOString();

                                          console.log(
                                            selectedTicket.seat_availability
                                          );

                                          let availabelSeat =
                                            selectedTicket.seat_availability;
                                          let documentID =
                                            selectedTicket.documentId;
                                          console.log(
                                            "document ID:",
                                            documentID
                                          );

                                          const newAvailabbleseat =
                                            availabelSeat - 1;

                                          console.log(newAvailabbleseat);

                                          const ticketData = {
                                            data: {
                                              user: email, // Using email as user identifier
                                              event: selectedTicket.documentId, // Use event documentId
                                              price:
                                                selectedTicket.standed_ticket_price,
                                              purchase_date: purchaseDate,
                                            },
                                          };

                                          const response = await axios.post(
                                            "http://localhost:1337/api/tickets",
                                            ticketData
                                          );

                                          await axios.put(
                                            `http://localhost:1337/api/events/${documentID}`,
                                            {
                                              data: {
                                                seat_availability:
                                                  newAvailabbleseat,
                                              },
                                            }
                                          );

                                          // Send Email Invoice via EmailJS
                                          const emailParams = {
                                            email_to: email,
                                            event_name:
                                              selectedStripeTicket.title,
                                            ticket_type:
                                              buyTicketType.toUpperCase(), // "VIP" or "STANDARD"
                                            price:
                                              selectedStripeTicket.standed_ticket_price,
                                            purchase_date: purchaseDate,
                                          };

                                          emailjs
                                            .send(
                                              process.env
                                                .PUBLIC_EMAILJS_SERVICE_ID,
                                              process.env
                                                .PAYMENT_PUBLIC_EMAILJS_TEMPLATE_ID,
                                              emailParams,
                                              process.env.PUBLIC_EMAILJS_USER_ID
                                            )
                                            .then((result) => {
                                              console.log(
                                                "Email sent successfully:",
                                                result.text
                                              );
                                            })
                                            .catch((err) => {
                                              console.error(
                                                "Error sending email:",
                                                err
                                              );
                                            });

                                          console.log(
                                            "Ticket added successfully:",
                                            response.data
                                          );
                                          alert(
                                            "Ticket has been added successfully!"
                                          );
                                        } catch (error) {
                                          console.error(
                                            "Error adding ticket:",
                                            error
                                          );
                                          alert(
                                            "Payment was successful, but ticket creation failed!"
                                          );
                                        }
                                      }}
                                      onError={(err) => {
                                        console.error(
                                          "PayPal Checkout error:",
                                          err
                                        );
                                        alert("Payment failed!");
                                      }}
                                    />
                                  </PayPalScriptProvider>
                                </div>
                              )}
                              <button
                                href="#"
                                className="event-details__ticket-two-btn thm-btn"
                                onClick={() => {
                                  createPaymentIntent(event);
                                  setSelectedStripeTicket(event);
                                }}
                              >
                                Buy Ticket with Stripe
                              </button>
                              <br />
                              <br />
                              {/* Stripe Checkout Button */}
                              {clientSecret && (
                                <Elements
                                  stripe={stripePromise}
                                  options={{ clientSecret }}
                                >
                                  <CheckoutForm />
                                </Elements>
                              )}
                            </div>
                          </div>
                        )}

                        {/* if ticket type multiple */}
                        {event.ticket_type === "multiple" && (
                          <div>
                            <h3 className="event-details__ticket-two-title">
                              VIP : ${event.vip_ticket_price}
                            </h3>
                            <br />
                            <h3 className="event-details__ticket-two-title">
                              Standed : ${event.standed_ticket_price}
                            </h3>

                            <p className="event-details__ticket-two-text">
                              This is your ticet price. Buy the ticket and enjoy
                              your movment Events are special occasions where
                              people gather together to celebrate...
                            </p>
                            <div className="event-details__ticket-two-btn-box">
                              <button
                                className="event-details__ticket-two-btn thm-btn"
                                onClick={() => setBuyTicketType("vip")}
                              >
                                Buy VIP Ticket
                              </button>
                              <br />
                              <br />
                              <button
                                className="event-details__ticket-two-btn thm-btn"
                                onClick={() => setBuyTicketType("standed")}
                              >
                                Buy Standed Ticket
                              </button>
                            </div>
                            {buyTicketType === "vip" && (
                              <div>
                                <p className="event-details__ticket-two-text">
                                  Buy vip Tickets with those options
                                </p>
                                <div className="event-details__ticket-two-btn-box">
                                  <button
                                    className="event-details__ticket-two-btn thm-btn"
                                    onClick={() =>
                                      handleUpdateMembership(
                                        event.vip_ticket_price,
                                        event
                                      )
                                    }
                                  >
                                    Buy VIP Ticket with subscription
                                  </button>
                                  <br />
                                  <br />
                                  <button
                                    href="#"
                                    className="event-details__ticket-two-btn thm-btn"
                                    onClick={() => setSelectedTicket(event)}
                                  >
                                    Buy VIP Ticket with Paypal
                                  </button>
                                  <br />
                                  <br />
                                  {/* PayPal Checkout */}
                                  {selectedTicket && (
                                    <div className="paypal-container">
                                      <h3>Complete Payment</h3>
                                      <br />
                                      <PayPalScriptProvider
                                        options={{
                                          "client-id":
                                            process.env.PAYPAL_CLIENTID,
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
                                                    value:
                                                      selectedTicket.vip_ticket_price,
                                                  },
                                                  description:
                                                    selectedTicket.title,
                                                },
                                              ],
                                            });
                                          }}
                                          onApprove={async (data, actions) => {
                                            try {
                                              const order =
                                                await actions.order.capture();
                                              console.log(
                                                "Transaction successful:",
                                                order
                                              );
                                              alert(
                                                `Payment successful for ${selectedTicket.title}!`
                                              );

                                              // Create the ticket after successful payment
                                              const purchaseDate =
                                                new Date().toISOString();

                                              console.log(
                                                selectedTicket.seat_availability
                                              );

                                              let availabelSeat =
                                                selectedTicket.seat_availability;
                                              let availabelVipSeat =
                                                selectedTicket.vip_seats;
                                              let documentID =
                                                selectedTicket.documentId;
                                              console.log(
                                                "document ID:",
                                                documentID
                                              );

                                              const newAvailabbleseat =
                                                availabelSeat - 1;
                                              const newAvailabbleVipseat =
                                                availabelVipSeat - 1;

                                              console.log(newAvailabbleseat);

                                              const ticketData = {
                                                data: {
                                                  user: email, // Using email as user identifier
                                                  event:
                                                    selectedTicket.documentId, // Use event documentId
                                                  price:
                                                    selectedTicket.vip_ticket_price,
                                                  purchase_date: purchaseDate,
                                                },
                                              };

                                              const response = await axios.post(
                                                "http://localhost:1337/api/tickets",
                                                ticketData
                                              );

                                              await axios.put(
                                                `http://localhost:1337/api/events/${documentID}`,
                                                {
                                                  data: {
                                                    seat_availability:
                                                      newAvailabbleseat,
                                                    vip_seats:
                                                      newAvailabbleVipseat,
                                                  },
                                                }
                                              );

                                              // Send Email Invoice via EmailJS
                                              const emailParams = {
                                                email_to: email,
                                                event_name:
                                                  selectedStripeTicket.title,
                                                ticket_type:
                                                  buyTicketType.toUpperCase(), // "VIP" or "STANDARD"
                                                price:
                                                  selectedStripeTicket.vip_ticket_price,
                                                purchase_date: purchaseDate,
                                              };

                                              emailjs
                                                .send(
                                                  process.env
                                                    .PUBLIC_EMAILJS_SERVICE_ID,
                                                  process.env
                                                    .PAYMENT_PUBLIC_EMAILJS_TEMPLATE_ID,
                                                  emailParams,
                                                  process.env
                                                    .PUBLIC_EMAILJS_USER_ID
                                                )
                                                .then((result) => {
                                                  console.log(
                                                    "Email sent successfully:",
                                                    result.text
                                                  );
                                                })
                                                .catch((err) => {
                                                  console.error(
                                                    "Error sending email:",
                                                    err
                                                  );
                                                });

                                              console.log(
                                                "Ticket added successfully:",
                                                response.data
                                              );
                                              alert(
                                                "Ticket has been added successfully!"
                                              );
                                            } catch (error) {
                                              console.error(
                                                "Error adding ticket:",
                                                error
                                              );
                                              alert(
                                                "Payment was successful, but ticket creation failed!"
                                              );
                                            }
                                          }}
                                          onError={(err) => {
                                            console.error(
                                              "PayPal Checkout error:",
                                              err
                                            );
                                            alert("Payment failed!");
                                          }}
                                        />
                                      </PayPalScriptProvider>
                                    </div>
                                  )}
                                  <button
                                    href="#"
                                    className="event-details__ticket-two-btn thm-btn"
                                    onClick={() => {
                                      createPaymentIntent(event);
                                      setSelectedStripeTicket(event);
                                    }}
                                  >
                                    Buy VIP Ticket with Stripe
                                  </button>
                                  <br />
                                  <br />
                                  {/* Stripe Checkout Button */}
                                  {clientSecret && (
                                    <Elements
                                      stripe={stripePromise}
                                      options={{ clientSecret }}
                                    >
                                      <CheckoutForm />
                                    </Elements>
                                  )}
                                </div>
                              </div>
                            )}

                            {buyTicketType === "standed" && (
                              <div>
                                <p className="event-details__ticket-two-text">
                                  Buy standed Tickets with those options
                                </p>
                                <div className="event-details__ticket-two-btn-box">
                                  <button
                                    className="event-details__ticket-two-btn thm-btn"
                                    onClick={() =>
                                      handleUpdateMembership(
                                        event.standed_ticket_price,
                                        event
                                      )
                                    }
                                  >
                                    Buy Standed Ticket with subscription
                                  </button>
                                  <br />
                                  <br />
                                  <button
                                    href="#"
                                    className="event-details__ticket-two-btn thm-btn"
                                    onClick={() => setSelectedTicket(event)}
                                  >
                                    Buy Standed Ticket with Paypal
                                  </button>
                                  <br />
                                  <br />
                                  {/* PayPal Checkout */}
                                  {selectedTicket && (
                                    <div className="paypal-container">
                                      <h3>Complete Payment</h3>
                                      <br />
                                      <PayPalScriptProvider
                                        options={{
                                          "client-id":
                                            process.env.PAYPAL_CLIENTID,
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
                                                    value:
                                                      selectedTicket.standed_ticket_price,
                                                  },
                                                  description:
                                                    selectedTicket.title,
                                                },
                                              ],
                                            });
                                          }}
                                          onApprove={async (data, actions) => {
                                            try {
                                              const order =
                                                await actions.order.capture();
                                              console.log(
                                                "Transaction successful:",
                                                order
                                              );
                                              alert(
                                                `Payment successful for ${selectedTicket.title}!`
                                              );

                                              // Create the ticket after successful payment
                                              const purchaseDate =
                                                new Date().toISOString();

                                              console.log(
                                                selectedTicket.seat_availability
                                              );

                                              let availabelSeat =
                                                selectedTicket.seat_availability;
                                              let availableStandedSeat =
                                                selectedTicket.standed_seat;
                                              let documentID =
                                                selectedTicket.documentId;
                                              console.log(
                                                "document ID:",
                                                documentID
                                              );

                                              const newAvailabbleseat =
                                                availabelSeat - 1;
                                              const newAvailableStandedSeat =
                                                availableStandedSeat - 1;

                                              console.log(newAvailabbleseat);

                                              const ticketData = {
                                                data: {
                                                  user: email, // Using email as user identifier
                                                  event:
                                                    selectedTicket.documentId, // Use event documentId
                                                  price:
                                                    selectedTicket.standed_ticket_price,
                                                  purchase_date: purchaseDate,
                                                },
                                              };

                                              const response = await axios.post(
                                                "http://localhost:1337/api/tickets",
                                                ticketData
                                              );

                                              await axios.put(
                                                `http://localhost:1337/api/events/${documentID}`,
                                                {
                                                  data: {
                                                    seat_availability:
                                                      newAvailabbleseat,
                                                    standed_seat:
                                                      newAvailableStandedSeat,
                                                  },
                                                }
                                              );

                                              // Send Email Invoice via EmailJS
                                              const emailParams = {
                                                email_to: email,
                                                event_name:
                                                  selectedStripeTicket.title,
                                                ticket_type:
                                                  buyTicketType.toUpperCase(), // "VIP" or "STANDARD"
                                                price:
                                                  selectedStripeTicket.standed_ticket_price,
                                                purchase_date: purchaseDate,
                                              };

                                              emailjs
                                                .send(
                                                  process.env
                                                    .PUBLIC_EMAILJS_SERVICE_ID,
                                                  process.env
                                                    .PAYMENT_PUBLIC_EMAILJS_TEMPLATE_ID,
                                                  emailParams,
                                                  process.env
                                                    .PUBLIC_EMAILJS_USER_ID
                                                )
                                                .then((result) => {
                                                  console.log(
                                                    "Email sent successfully:",
                                                    result.text
                                                  );
                                                })
                                                .catch((err) => {
                                                  console.error(
                                                    "Error sending email:",
                                                    err
                                                  );
                                                });

                                              console.log(
                                                "Ticket added successfully:",
                                                response.data
                                              );
                                              alert(
                                                "Ticket has been added successfully!"
                                              );
                                            } catch (error) {
                                              console.error(
                                                "Error adding ticket:",
                                                error
                                              );
                                              alert(
                                                "Payment was successful, but ticket creation failed!"
                                              );
                                            }
                                          }}
                                          onError={(err) => {
                                            console.error(
                                              "PayPal Checkout error:",
                                              err
                                            );
                                            alert("Payment failed!");
                                          }}
                                        />
                                      </PayPalScriptProvider>
                                    </div>
                                  )}
                                  <button
                                    href="#"
                                    className="event-details__ticket-two-btn thm-btn"
                                    onClick={() => {
                                      createPaymentIntent(event);
                                      setSelectedStripeTicket(event);
                                    }}
                                  >
                                    Buy Standed Ticket with Stripe
                                  </button>
                                  <br />
                                  <br />
                                  {/* Stripe Checkout Button */}
                                  {clientSecret && (
                                    <Elements
                                      stripe={stripePromise}
                                      options={{ clientSecret }}
                                    >
                                      <CheckoutForm />
                                    </Elements>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
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
                        <h3 className="event-details__location-title">
                          Location
                        </h3>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "400px",
                          }}
                        >
                          {/* Google Maps iframe */}
                          <iframe
                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798511757686!2d79.8604543153171!3d6.914657220411358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTQnNTIuOCJOIDc5wrA1MSc0Mi4xIkU!5e0!3m2!1sen!2slk!4v1622549400000!5m2!1sen!2slk`}
                            className="google-map__one"
                            allowFullScreen
                            title="Event Location"
                            style={{
                              width: "100%",
                              height: "100%",
                              border: "none",
                              borderRadius: "5px",
                            }}
                          ></iframe>

                          {/* Transparent overlay to handle clicks */}
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              cursor: "pointer",
                              backgroundColor: "transparent",
                            }}
                            onClick={() => {
                              const location = encodeURIComponent(
                                event.location
                              );
                              window.open(
                                `https://www.google.com/maps?q=${location}`,
                                "_blank"
                              );
                            }}
                          ></div>
                        </div>
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
