"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';

export default function Footer1() {

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
            {/* Site Footer Start */}
            <footer className="site-footer">
                <div className="site-footer__shape-1 float-bob-y">
                    <img src="/assets/images/shapes/site-footer-shape-1.png" alt="" />
                </div>
                <div className="site-footer__top">
                    <div className="container">
                        <div className="site-footer__top-inner">
                            <div className="site-footer__logo">
                                <Link href="/">
                                    <img src="/assets/images/resources/site-footer-logo-1.png" alt="" />
                                </Link>
                            </div>
                            <div className="site-footer__social">
                                <Link href="#"><i className="icon-facebook"></i></Link>
                                <Link href="#"><i className="icon-fi"></i></Link>
                                <Link href="#"><i className="icon-instagram"></i></Link>
                                <Link href="#"><i className="icon-pinterest"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-footer__middle">
                    <div className="container">
                        <div className="site-footer__middle-inner">
                            <div className="row">
                                <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                                    <div className="footer-widget__column footer-widget__events">
                                        <div className="footer-widget__title-box">
                                            <h3 className="footer-widget__title">Upcoming Events</h3>
                                        </div>
                                        {upcomingEvents.map((event) => (
                                        <ul className="footer-widget__events-list list-unstyled">
                                            <li>
                                                <p>{event.date}</p>
                                                <h5>{event.title}</h5>
                                                <Link href={{
                        pathname: "/event-details",
                        query: { documentId: event.documentId }, // Pass documentId as query parameter
                      }}>Get a Ticket <span className="icon-arrow-right"></span></Link>
                                            </li>
                                        </ul>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                                    <div className="footer-widget__column footer-widget__link">
                                        <div className="footer-widget__title-box">
                                            <h3 className="footer-widget__title">Quick links</h3>
                                        </div>
                                        <ul className="footer-widget__link-list list-unstyled">
                                            <li><Link href="/index-2">Home</Link></li>
                                            <li><Link href="/event">Browser event</Link></li>
                                            <li><Link href="/host">Host event</Link></li>
                                            <li><Link href="/blog">Subscription</Link></li>
                                            <li><Link href="/contact">Contact Us</Link></li>
                                            <li><Link href="/profile">Profile</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                                    <div className="footer-widget__column footer-widget__contact">
                                        <div className="footer-widget__title-box">
                                            <h3 className="footer-widget__title">Contact</h3>
                                        </div>
                                        <div className="footer-widget__contact-inner">
                                            <ul className="footer-widget__contact-list list-unstyled">
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-envelop"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p><a href="mailto:nafiz125@gmail.com">nafiz125@gmail.com</a></p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-pin"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p>3891 Ranchview Dr. Richardson</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="icon">
                                                        <span className="icon-call"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p><a href="tel:01245789321">01245789321, 012457895146</a></p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-footer__bottom">
                    <div className="container">
                        <div className="site-footer__bottom-inner">
                            <p className="site-footer__bottom-text">© EventFlow 2024 | All Rights Reserved</p>
                            <ul className="list-unstyled site-footer__bottom-menu">
                                <li><Link href="/about">Terms & Condition</Link></li>
                                <li><Link href="/about">Privacy Policy</Link></li>
                                <li><Link href="/about">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Site Footer End */}
        </>
    );
}
