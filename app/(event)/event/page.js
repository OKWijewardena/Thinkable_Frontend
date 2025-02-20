"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import CategoryOne from "@/components/sections/home1/CategoryOne";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(""); // State for event name search
  const [searchLocation, setSearchLocation] = useState(""); // State for location search
  const [searchDate, setSearchDate] = useState(""); // State for date search
  const [upcomingEvents, setUpcomingEvents] = useState([]); // State for fetched events
  const [filteredEvents, setFilteredEvents] = useState([]); // State for filtered events

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

  // Fetch event details
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/events?populate=event_image"
        );

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

        setUpcomingEvents(eventsData); // Save the fetched events
        setFilteredEvents(eventsData); // Initialize filtered events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    filterEvents(searchValue, searchLocation, searchDate);
  };

  const handleLocationChange = (e) => {
    const locationValue = e.target.value;
    setSearchLocation(locationValue);

    filterEvents(searchTerm, locationValue, searchDate);
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSearchDate(dateValue);

    filterEvents(searchTerm, searchLocation, dateValue);
  };

  // Filter events based on search term, location, and date
  const filterEvents = (term, location, date) => {
    const filtered = upcomingEvents.filter((event) => {
      const matchesTerm = term
        ? event.title.toLowerCase().includes(term.toLowerCase())
        : true;
      const matchesLocation = location
        ? event.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesDate = date ? event.date === date : true;

      return matchesTerm && matchesLocation && matchesDate;
    });

    setFilteredEvents(filtered);
  };

  const saveEvent = async (event) => {
    try {
        // Ensure event has a valid documentId
        if (!event?.documentId) {
            alert("Invalid event data!");
            return;
        }

        // Ensure user email exists
        if (!email) {
            alert("User email is missing!");
            return;
        }

        // Make API request
        const response = await axios.post("http://localhost:1337/api/user-events", {
            data: {
                user: email,
                event: event.documentId,
                event_status: "save",
                event_name: event.title,
                event_description: event.description
            },
        });

        // Success message
        if (response.status === 200 || response.status === 201) {
            alert("Your event has been saved!");
        } else {
            alert("Failed to save event. Please try again.");
        }
    } catch (error) {
        console.error("Error saving event:", error.response?.data || error.message);
        alert("An error occurred while saving the event.");
    }
};


  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Event">
        <div>
          {/* CTA One Start */}
          <section className="cta-one">
            <div className="container">
              <div className="cta-one__inner">
                <h3 className="cta-one__title">Discover Events</h3>
                <form className="cta-one__form mc-form" noValidate>
                  <div className="cta-one__form-input-box">
                    <input
                      type="text"
                      placeholder="Search by event name"
                      value={searchTerm} // Controlled input for event name
                      onChange={handleSearchChange} // Update search term
                    />
                  </div>
                  <br/>
                  <div className="cta-one__form-input-box">
                    <input
                      type="text"
                      placeholder="Search by event location"
                      value={searchLocation} // Controlled input for location
                      onChange={handleLocationChange} // Update location
                    />
                  </div>
                  <br/>
                  <div className="cta-one__form-input-box">
                    <input
                      placeholder="Search by event date"
                      type="date"
                      value={searchDate} // Controlled input for date
                      onChange={handleDateChange} // Update date
                    />
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Display Events */}
          <section className="team-page">
            <div className="container">
              <div className="row">
                {filteredEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`col-xl-4 col-lg-6 col-md-6 wow fadeIn${
                      index % 2 === 0 ? "Left" : "Right"
                    }`}
                    data-wow-delay={`${(index + 1) * 100}ms`}
                  >
                    <div className="team-one__single">
                      <div className="team-one__img-box">
                        <div className="team-one__img">
                          <img
                            src={
                              event.event_image[0]?.url ||
                              "/assets/images/default-event.jpg"
                            }
                            alt={event.title}
                          />
                          <div className="team-one__content">
                            <h4 className="team-one__name">
                              <a href="team-details">{event.title}</a>
                            </h4>
                            <p className="team-one__sub-title">
                              {event.description}
                            </p>
                          </div>
                          <div className="team-one__content-hover">
                            <h4 className="team-one__name-hover">
                              <a href="team-details">{event.title}</a>
                            </h4>
                            <p className="team-one__sub-title-hover">
                              {event.location}
                            </p>
                            <p className="team-one__text-hover">{event.date}</p>
                            <div className="schedule-one__btn-box">
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
                              <button
                                className="schedule-one__btn thm-btn"
                                onClick={() => saveEvent(event)}
                              >
                                save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <CategoryOne />
        </div>
      </Layout>
    </>
  );
}
