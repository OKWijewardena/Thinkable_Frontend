"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";

export default function EventDirection() {

  const [totalEvents, setTotalEvents] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  const [totalTicketIncome, setTotalTicketIncome] = useState("");
  const [totalSavedEvents, setTotalSavedEvents] = useState("");
  // State for dynamic content
  const [eventContent, setEventContent] = useState({
    tagline: "Your Event Direction",
    title: "Static details about your events",
    text: "Events bring people together for a shared experience and celebration. <br> From weddings and birthdays to conferences.",
    // phone: "3075550133",
    // callText: "Call Us",
    // callNumber: "(307) 555-0133",
    // iconSrc: "/assets/images/icon/event-direction-chat-icon.png",
  });

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
    calculateTotalEvents();
    calculateTicketCounts();
    calculateTicketIncome();
    calculateSavedEvents();
  }, []);

  const calculateTotalEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/events?filters[user][$eq]=${email}`
      );
  
      // Ensure response contains data
      if (response.data && response.data.data) {
        const totalEvents = response.data.data.length; // Count of events
        console.log("Total Events:", totalEvents);
        setTotalEvents(totalEvents);
      } else {
        console.log("No events found.");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const calculateTicketCounts = async () => {
    try {
      // Fetch events created by the user
      const eventsResponse = await axios.get(
        `http://localhost:1337/api/events?filters[user][$eq]=${email}`
      );
  
      if (!eventsResponse.data || !eventsResponse.data.data) {
        console.log("No events found.");
        return 0;
      }
  
      const events = eventsResponse.data.data; // Extract event data
      let totalTickets = 0;
  
      // Iterate through each event and fetch ticket counts
      for (const event of events) {
        const eventId = event.documentId; // Assuming 'id' is the event identifier
  
        const ticketsResponse = await axios.get(
          `http://localhost:1337/api/tickets?filters[event][$eq]=${eventId}`
        );
  
        if (ticketsResponse.data && ticketsResponse.data.data) {
          totalTickets += ticketsResponse.data.data.length;
        }
      }
  
      console.log("Total Tickets Purchased for All Events:", totalTickets);
      setTotalTickets(totalTickets);
    } catch (error) {
      console.error("Error fetching ticket counts:", error);
    }
  };

  const calculateTicketIncome = async () => {

    try {
      // Fetch events created by the user
      const eventsResponse = await axios.get(
        `http://localhost:1337/api/events?filters[user][$eq]=${email}`
      );
  
      if (!eventsResponse.data || !eventsResponse.data.data) {
        console.log("No events found.");
        return 0;
      }
  
      const events = eventsResponse.data.data; // Extract event data
      let totalTicketsIncome = 0;
  
      // Iterate through each event and fetch ticket counts
      for (const event of events) {
        const eventId = event.documentId; // Assuming 'id' is the event identifier
  
        const ticketsResponse = await axios.get(
          `http://localhost:1337/api/tickets?filters[event][$eq]=${eventId}`
        );
  
        if (ticketsResponse.data && ticketsResponse.data.data) {
          const tickets = ticketsResponse.data.data;
        totalTicketsIncome += tickets.reduce((sum, ticket) => sum + (ticket.price || 0), 0); 
        }
      }
  
      console.log("Total Tickets Purchased for All Events:", totalTicketsIncome);
      setTotalTicketIncome(totalTicketsIncome);
    } catch (error) {
      console.error("Error fetching ticket counts:", error);
    }

  }

  const calculateSavedEvents = async () => {

    try {
      // Fetch events created by the user
      const eventsResponse = await axios.get(
        `http://localhost:1337/api/events?filters[user][$eq]=${email}`
      );
  
      if (!eventsResponse.data || !eventsResponse.data.data) {
        console.log("No events found.");
        return 0;
      }
  
      const events = eventsResponse.data.data; // Extract event data
      let totalSavedEvents = 0;
  
      // Iterate through each event and fetch ticket counts
      for (const event of events) {
        const eventId = event.documentId; // Assuming 'id' is the event identifier
  
        const ticketsResponse = await axios.get(
          `http://localhost:1337/api/user-events?filters[event][$eq]=${eventId}`
        );
  
        if (ticketsResponse.data && ticketsResponse.data.data) {
          totalSavedEvents += ticketsResponse.data.data.length;
        }
      }
  
      console.log("Total Saved Events:", totalSavedEvents);
      setTotalSavedEvents(totalSavedEvents);
    } catch (error) {
      console.error("Error fetching ticket counts:", error);
    }

  }
  

  return (
    <>
      {/* Event Direction Start */}
      <section className="event-direction">
        <div className="container">
          <div className="event-direction__inner">
            <div className="row">
              <div className="col-xl-7 wow fadeInLeft" data-wow-delay="100ms">
                <div className="event-direction__left">
                  <div className="section-title text-left">
                    <div className="section-title__tagline-box">
                      <span className="section-title__tagline">{eventContent.tagline}</span>
                    </div>
                    <h2 className="section-title__title" dangerouslySetInnerHTML={{ __html: eventContent.title }}></h2>
                  </div>
                  <p className="event-direction__text" dangerouslySetInnerHTML={{ __html: eventContent.text }}></p>
                  {/* <div className="event-direction__call">
                    <div className="event-direction__call-icon">
                      <img src={eventContent.iconSrc} alt="Call Icon" />
                    </div>
                    <div className="event-direction__call-content">
                      <p>{eventContent.callText}</p>
                      <h4><a href={`tel:${eventContent.phone}`}>{eventContent.callNumber}</a></h4>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-xl-5 wow fadeInRight" data-wow-delay="300ms">
                <div className="event-direction__right">
                <ul className="event-direction__counter list-unstyled">
                    <li>
                      <div className="event-direction__counter-single">
                        <div className="event-direction__counter-box">
                          <h3 className="odometer">
                            <CountUp start={0} end={totalEvents} duration={2} />
                          </h3>
                          {/* <span className="event-direction__counter-plus">
                            +
                          </span> */}
                        </div>
                        <p className="event-direction__counter-text">
                          total events
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="event-direction__counter-single">
                        <div className="event-direction__counter-box">
                          <h3 className="odometer">
                            <CountUp start={0} end={totalTickets} duration={2} />
                          </h3>
                          {/* <span className="event-direction__counter-plus">
                            +
                          </span> */}
                        </div>
                        <p className="event-direction__counter-text">
                          Total tickets
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="event-direction__counter-single">
                        <div className="event-direction__counter-box">
                        <span className="event-direction__counter-plus">
                            $
                          </span>
                          <h3 className="odometer">
                            <CountUp start={0} end={totalTicketIncome} duration={2} />
                          </h3>
                        </div>
                        <p className="event-direction__counter-text">
                          Event Ticket Income
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="event-direction__counter-single">
                        <div className="event-direction__counter-box">
                          <h3 className="odometer">
                            <CountUp start={0} end={totalSavedEvents} duration={2} />
                          </h3>
                          {/* <span className="event-direction__counter-plus">
                            +
                          </span> */}
                        </div>
                        <p className="event-direction__counter-text">
                          Wishlist Events
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Event Direction End */}
    </>
  );
}
