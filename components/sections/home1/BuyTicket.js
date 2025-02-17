"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function BuyTicket() {
  // State for dynamic content
  const [ticketContent, setTicketContent] = useState({
    address: "Mirpur 01 Road N 12 Dhaka Bangladesh",
    timing: "10 Am To 10 Pm 20 April 2024",
    title: "Grab Your Seat Now Or You May Regret it Once",
    description:
      "Events bring people together for a shared experience celebration. From weddings and birthdays to conferences, events bring people together for a shared purpose.",
    buttons: [
      { id: 1, text: "Buy Your Ticket", link: "/contact", class: "buy-ticket__btn-1" },
      { id: 2, text: "Contact Us", link: "/contact", class: "buy-ticket__btn-2" },
    ],
    ticketImage: "/assets/images/resources/buy-ticket-img.jpg",
  });

  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:1337/api/events?populate=event_image');
            console.log(response);

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

            // Find the event with the lowest seat availability
            const lowestSeatEvent = eventsData.reduce((prev, current) => {
                return (prev.seat_availability < current.seat_availability) ? prev : current;
            });

            setUpcomingEvents([lowestSeatEvent]); // Wrap in an array
            console.log(lowestSeatEvent);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    fetchEvents();
}, []);



  return (
    <>
      {/* Buy Ticket Start */}
      <section className="buy-ticket">
        <div className="container">
        {upcomingEvents.map((event) => (
          <div className="row">
            <div className="col-xl-6">
              <div
                className="buy-ticket__left wow fadeInLeft"
                data-wow-delay="100ms"
              >
                <ul className="buy-ticket__address list-unstyled">
                  <li>
                    <div className="icon">
                      <span className="icon-clock"></span>
                    </div>
                    <div className="text">
                      <p>{event.title}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-pin"></span>
                    </div>
                    <div className="text">
                      <p>{ticketContent.timing}</p>
                    </div>
                  </li>
                </ul>
                <h3 className="buy-ticket__title">{ticketContent.title}</h3>
                <p className="buy-ticket__text">{ticketContent.description}</p>
                <div className="buy-ticket__btn-box">
                {ticketContent.buttons.map((button) => (
                    <Link
                      key={button.id}
                      href={{
                        pathname: "/event-details",
                        query: { documentId: event.documentId }, // Pass documentId as query parameter
                      }}
                      className={`${button.class} thm-btn`}
                    >
                      {button.text}
                      <span className="icon-arrow-right"></span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div
                className="buy-ticket__right wow fadeInRight"
                data-wow-delay="300ms"
              >
                <div className="buy-ticket__img">
                  <img src={event.event_image[0]?.url || "/assets/images/default-event.jpg"} alt="Ticket Image" />
                </div>
              </div>
            </div>
          </div>
                        ))}
        </div>
      </section>
      {/* Buy Ticket End */}
    </>
  );
}
