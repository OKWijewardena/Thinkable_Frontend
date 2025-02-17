"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const ScheduleOne = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [eventCategory, setEventCategory] = useState([]);
    

    const handleTabClick = (categoryId) => {
        setActiveTab(categoryId);
        fetchEvents(categoryId); // Fetch events for the selected category
    };

    useEffect(() => {      
        fetchEvents();
        fetchCategory();
      }, []);

      const fetchEvents = async (categoryId = null) => {
        try {
            // Fetch all events from the API
            const response = await axios.get("http://localhost:1337/api/events?populate=event_image");
    
            // Map and structure the event data
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
                category_id: event.category_id,
                event_image: event.event_image
          ? [{ url: `http://localhost:1337${event.event_image[0]?.url}` }] // Prefix URL with the Strapi server URL
          : [], // Wrap in array
              }));

              // Ensure categoryId is a string for comparison
        const categoryIdStr = categoryId ? String(categoryId) : null;
        console.log(categoryIdStr);

        // Filter events by category if a categoryId is provided
        const filteredEvents = categoryIdStr
            ? eventsData.filter((event) => String(event.category_id) == categoryIdStr)
            : eventsData;
    
            // Update the state with the filtered events
            console.log(filteredEvents);
            setUpcomingEvents(filteredEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };
    

      const fetchCategory = async() => {
        try {
            const response = await axios.get('http://localhost:1337/api/event-categories');
            console.log(response);
      
            const eventsData = response.data.data.map((event) => ({
              id: event.id,
              documentId: event.documentId,
              category_name: event.category_name,
            }));
      
            setEventCategory(eventsData);
            console.log(eventsData);
          } catch (error) {
            console.error('Error fetching events:', error);
          }

      }
      

    return (
        <section className="schedule-one">
            <div className="container">
                <div className="schedule-one__inner">
                    <div className="section-title text-left">
                        <div className="section-title__tagline-box">
                            <span className="section-title__tagline">Event categores</span>
                        </div>
                        <h2 className="section-title__title">Follow event categories</h2>
                    </div>
                    <div className="schedule-one__main-tab-box tabs-box">
                        <ul className="tab-buttons clearfix list-unstyled">
                            {eventCategory.map((category) => (
                                <li
                                    key={category.id}
                                    className={`tab-btn ${activeTab === category.id ? "active-btn" : ""}`}
                                    onClick={() => handleTabClick(category.id)}
                                >
                                    <h3>{category.category_name}</h3>
                                    <p>Event category</p>
                                </li>
                            ))} 
                        </ul>
                        <div className="tabs-content">
                            <div>
                                <div className="schedule-one__tab-content-box">
                                {upcomingEvents.map((event) => (
                                    <div className="schedule-one__single">
                                        <div className="schedule-one__left">
                                        <h3 className="schedule-one__title">
                                            <Link href="/event-details">
                                            {event.title}
                                            </Link>
                                        </h3>
                                        <p className="schedule-one__text">
                                        {/* {event.description} */}
                                        </p>
                                        </div>
                                        <div className="schedule-one__img">
                                        <img
    src={event.event_image[0]?.url || "/assets/images/default-event.jpg"}
    alt=""
    style={{ width: "309px", height: "166px", objectFit: "cover" }}
/>
                                        </div>
                                        <div className="schedule-one__address-and-btn-box">
                                        <ul className="list-unstyled schedule-one__address">
                                            <li>
                                            <div className="icon">
                                                <span className="icon-clock"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                {event.date}
                                                </p>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                {event.location}
                                                </p>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className="schedule-one__btn-box">
                                            <Link href={{
                                  pathname: "/event-details",
                                  query: { documentId: event.documentId }, // Pass documentId as query parameter
                                }} className="schedule-one__btn thm-btn">
                                            Buy Ticket
                                            <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>
                                    ))} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleOne;
