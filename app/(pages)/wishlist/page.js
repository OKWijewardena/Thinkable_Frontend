"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "@/components/layout/Layout";

export default function Home() {
  
  const [userEvent, setUserEvent] = useState([]); // State for fetched events
  const [eventDetails, setEventDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
        console.log("Fetching user-events for email:", email);
        
        const response = await axios.get(
          `http://localhost:1337/api/user-events?filters[event_status][$eq]=save&filters[user][$eq]=${email}`
        );
  
        const userEventDataArray = response.data.data.map((user_event) => ({
          id: user_event.id,
          documentId: user_event.documentId,
          event: user_event.event,
          event_name: user_event.event_name,
          event_description: user_event.event_description
        }));
  
        setUserEvent(userEventDataArray);
  
  } catch (error) {
    console.error("Error fetching user-events:", error);
  }
  };

  const fetchEvent = async (eventId) => {

    try {
      const eventResponse = await axios.get(`http://localhost:1337/api/events?populate=event_image&filters[documentId][$eq]=${eventId}`);
  
        const eventsData = eventResponse.data.data.map((event) => ({
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
  
        setEventDetails(eventsData);
        // setImagePreview(eventsData.event_image[0]?.url || null);
        setShowModal(true);
      
    } catch (error) {
      console.error("Error fetching Event details:", error);
    }
  }
  


  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Saved Events">
        <div>
        <section className="blog-page">
        <div className="container">

        <div className="row">
              <h1 className="blog-one__title">Your Saved Events</h1>
                {userEvent.map((event, index) => (
                  <div
                    key={event.id}
                    className={`col-xl-4 col-lg-4 col-md-6 wow fadeIn${
                      index % 3 === 0
                        ? "Left"
                        : index % 3 === 1
                        ? "Up"
                        : "Right"
                    }`}
                    data-wow-delay={`${(index + 1) * 100}ms`}
                  >
                    <div className="blog-one__single">
                      <div className="blog-one__img">
                      </div>
                      <div className="blog-one__content">
                      <h3 className="blog-one__title">{event.event_name}</h3>
                        <ul className="blog-one__meta list-unstyled">
                        </ul>
                        <ul className="blog-one__meta list-unstyled">
                          <li><a href="#">{event.event_description}</a></li>
                        </ul>
                        <br/><br/>
                        <div className="blog-one__btn-box-two">
                          <button
                            className="blog-one__btn-2 thm-btn"
                            onClick={() => fetchEvent(event.event)}
                          >
                            Event Details
                            <span className="icon-arrow-right"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              </div>

              </section>

              {/* Modal Popup */}
        {showModal && (
          <div className="dialog-backdrop">
          <div className="dialog-box">
            <div className="event-details__speakers">
            <h3>Event Details</h3>
            {eventDetails.map((event) => (
          
            <form>
              <div>
                
              <br/>
              <div className="file-input">
                {event.event_image.length > 0 && (
  <img
    src={event.event_image[0].url}
    alt="Event Preview"
    style={{ maxWidth: "100%" }}
  />
)}
              </div>
              <br/>
              <h5 className="event-details__speakers-title">{event.title}</h5>
              </div>
              <br/>
              <div>
                <label>Description</label>
                <p className="event-details__speakers-title">{event.description}</p>
              </div>
              <br/>
              <div>
                <label>Date</label>
                <p className="event-details__speakers-title">{event.date}</p>
              </div>
              <br/>
              <div>
                <label>Location</label>
                <p className="event-details__speakers-title">{event.location}</p>
              </div>
              <br/>
              <div>
                <label>Ticket Price</label>
                <p className="event-details__speakers-title">{event.ticket_price}</p>
              </div>
              <br/>
              <div className="button-group">
                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
                <Link
                                href={{
                                  pathname: "/event-details",
                                  query: { documentId: event.documentId }, // Pass documentId as query parameter
                                }}
                                className="schedule-one__btn thm-btn"
                              >
                                Buy Ticket{" "}
                                <span className="icon-arrow-right"></span>
                              </Link>
              </div>
            </form>
            ))}
            </div>
          </div>
        </div>
        )}
        </div>
      </Layout>
    </>
  );
}
