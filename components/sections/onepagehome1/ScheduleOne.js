"use client"; 
import Link from "next/link";
import React, { useState } from 'react';

const ScheduleOne = () => {
    const [activeTab, setActiveTab] = useState('1st-day');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <section className="schedule-one" id="event">
            <div className="container">
                <div className="schedule-one__inner">
                    <div className="section-title text-left">
                        <div className="section-title__tagline-box">
                            <span className="section-title__tagline">Event Schedule</span>
                        </div>
                        <h2 className="section-title__title">Follow event schedule</h2>
                    </div>
                    <div className="schedule-one__main-tab-box tabs-box">
                        <ul className="tab-buttons clearfix list-unstyled">
                            <li
                                className={`tab-btn ${activeTab === '1st-day' ? 'active-btn' : ''}`}
                                onClick={() => handleTabClick('1st-day')}
                            >
                                <h3>Day 01</h3>
                                <p>16 April 2024</p>
                            </li>
                            <li
                                className={`tab-btn ${activeTab === '2nd-day' ? 'active-btn' : ''}`}
                                onClick={() => handleTabClick('2nd-day')}
                            >
                                <h3>Day 02</h3>
                                <p>18 April 2024</p>
                            </li>
                            <li
                                className={`tab-btn ${activeTab === '3rd-day' ? 'active-btn' : ''}`}
                                onClick={() => handleTabClick('3rd-day')}
                            >
                                <h3>Day 03</h3>
                                <p>24 April 2024</p>
                            </li>
                        </ul>
                        <div className="tabs-content">
                            <div className={`tab ${activeTab === '1st-day' ? 'active-tab' : ''}`} id="1st-day">
                                <div className="schedule-one__tab-content-box">
                                    <div className="schedule-one__single">
                                        <div className="schedule-one__left">
                                        <h3 className="schedule-one__title">
                                            <Link href="/event-details">
                                            Events That Leave a <br />
                                            Impression
                                            </Link>
                                        </h3>
                                        <p className="schedule-one__text">
                                            A personal portfolio is a curated collection of <br /> an
                                            individual's professional work
                                        </p>
                                        </div>
                                        <div className="schedule-one__img">
                                        <img src="/assets/images/resources/schedule-one-1-1.jpg" alt="" />
                                        </div>
                                        <div className="schedule-one__address-and-btn-box">
                                        <ul className="list-unstyled schedule-one__address">
                                            <li>
                                            <div className="icon">
                                                <span className="icon-clock"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                10 Am To 10 Pm <br /> 20 April 2024
                                                </p>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                </p>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className="schedule-one__btn-box">
                                            <Link href="/contact" className="schedule-one__btn thm-btn">
                                            Buy Ticket
                                            <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="schedule-one__single">
                                        <div className="schedule-one__left">
                                        <h3 className="schedule-one__title">
                                            <Link href="/event-details">
                                            Sparkle & Shine on <br />
                                            Celebrations
                                            </Link>
                                        </h3>
                                        <p className="schedule-one__text">
                                            A personal portfolio is a curated collection of <br /> an
                                            individual's professional work
                                        </p>
                                        </div>
                                        <div className="schedule-one__img">
                                        <img src="/assets/images/resources/schedule-one-1-2.jpg" alt="" />
                                        </div>
                                        <div className="schedule-one__address-and-btn-box">
                                        <ul className="list-unstyled schedule-one__address">
                                            <li>
                                            <div className="icon">
                                                <span className="icon-clock"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                10 Am To 10 Pm <br /> 20 April 2024
                                                </p>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                </p>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className="schedule-one__btn-box">
                                            <Link href="/contact" className="schedule-one__btn thm-btn">
                                            Buy Ticket
                                            <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="schedule-one__single">
                                        <div className="schedule-one__left">
                                        <h3 className="schedule-one__title">
                                            <Link href="/event-details">
                                            Sparkle & Shine <br /> Events
                                            </Link>
                                        </h3>
                                        <p className="schedule-one__text">
                                            A personal portfolio is a curated collection of <br /> an
                                            individual's professional work
                                        </p>
                                        </div>
                                        <div className="schedule-one__img">
                                        <img src="/assets/images/resources/schedule-one-1-3.jpg" alt="" />
                                        </div>
                                        <div className="schedule-one__address-and-btn-box">
                                        <ul className="list-unstyled schedule-one__address">
                                            <li>
                                            <div className="icon">
                                                <span className="icon-clock"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                10 Am To 10 Pm <br /> 20 April 2024
                                                </p>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                </p>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className="schedule-one__btn-box">
                                            <Link href="/contact" className="schedule-one__btn thm-btn">
                                            Buy Ticket
                                            <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`tab ${activeTab === '2nd-day' ? 'active-tab' : ''}`} id="2nd-day">
                                <div className="schedule-one__tab-content-box">
                                    <div className="schedule-one__single">
                                        <div className="schedule-one__left">
                                        <h3 className="schedule-one__title">
                                            <Link href="/event-details">
                                            Events That Leave a <br /> Impression
                                            </Link>
                                        </h3>
                                        <p className="schedule-one__text">
                                            A personal portfolio is a curated collection of <br /> an individual's professional work
                                        </p>
                                        </div>
                                        <div className="schedule-one__img">
                                        <img src="/assets/images/resources/schedule-one-1-4.jpg" alt="Event Image" />
                                        </div>
                                        <div className="schedule-one__address-and-btn-box">
                                        <ul className="list-unstyled schedule-one__address">
                                            <li>
                                            <div className="icon">
                                                <span className="icon-clock"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                10 Am To 10 Pm <br /> 20 April 2024
                                                </p>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                </p>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className="schedule-one__btn-box">
                                            <Link href="/contact" className="schedule-one__btn thm-btn">
                                            Buy Ticket <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="schedule-one__single">
                                        <div className="schedule-one__left">
                                        <h3 className="schedule-one__title">
                                            <Link href="/event-details">
                                            Sparkle & Shine on <br /> Celebrations
                                            </Link>
                                        </h3>
                                        <p className="schedule-one__text">
                                            A personal portfolio is a curated collection of <br /> an individual's professional work
                                        </p>
                                        </div>
                                        <div className="schedule-one__img">
                                        <img src="/assets/images/resources/schedule-one-1-5.jpg" alt="Event Image" />
                                        </div>
                                        <div className="schedule-one__address-and-btn-box">
                                        <ul className="list-unstyled schedule-one__address">
                                            <li>
                                            <div className="icon">
                                                <span className="icon-clock"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                10 Am To 10 Pm <br /> 20 April 2024
                                                </p>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                </p>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className="schedule-one__btn-box">
                                            <Link href="/contact" className="schedule-one__btn thm-btn">
                                            Buy Ticket <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="schedule-one__single">
                                        <div className="schedule-one__left">
                                        <h3 className="schedule-one__title">
                                            <Link href="/event-details">
                                            Sparkle & Shine <br /> Events
                                            </Link>
                                        </h3>
                                        <p className="schedule-one__text">
                                            A personal portfolio is a curated collection of <br /> an individual's professional work
                                        </p>
                                        </div>
                                        <div className="schedule-one__img">
                                        <img src="/assets/images/resources/schedule-one-1-6.jpg" alt="Event Image" />
                                        </div>
                                        <div className="schedule-one__address-and-btn-box">
                                        <ul className="list-unstyled schedule-one__address">
                                            <li>
                                            <div className="icon">
                                                <span className="icon-clock"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                10 Am To 10 Pm <br /> 20 April 2024
                                                </p>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>
                                                Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                </p>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className="schedule-one__btn-box">
                                            <Link href="/contact" className="schedule-one__btn thm-btn">
                                            Buy Ticket <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`tab ${activeTab === '3rd-day' ? 'active-tab' : ''}`} id="3rd-day">
                                <div className="schedule-one__tab-content-box">
                                    <div className="schedule-one__single">
                                        <div className="schedule-one__left">
                                        <h3 className="schedule-one__title">
                                            <Link href="/event-details">
                                            Events That Leave a <br /> Impression
                                            </Link>
                                        </h3>
                                        <p className="schedule-one__text">
                                            A personal portfolio is a curated collection of <br /> an individual's professional work
                                        </p>
                                        </div>
                                        <div className="schedule-one__img">
                                        <img src="/assets/images/resources/schedule-one-1-7.jpg" alt="" />
                                        </div>
                                        <div className="schedule-one__address-and-btn-box">
                                        <ul className="list-unstyled schedule-one__address">
                                            <li>
                                            <div className="icon">
                                                <span className="icon-clock"></span>
                                            </div>
                                            <div className="text">
                                                <p>10 Am To 10 Pm <br /> 20 April 2024</p>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>Mirpur 01 Road N 12 Dhaka <br /> Bangladesh</p>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className="schedule-one__btn-box">
                                            <Link href="/contact" className="schedule-one__btn thm-btn">
                                                Buy Ticket <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="schedule-one__single">
                                        <div className="schedule-one__left">
                                        <h3 className="schedule-one__title">
                                            <Link href="/event-details">
                                            Sparkle & Shine on <br /> Celebrations
                                            </Link>
                                        </h3>
                                        <p className="schedule-one__text">
                                            A personal portfolio is a curated collection of <br /> an individual's professional work
                                        </p>
                                        </div>
                                        <div className="schedule-one__img">
                                        <img src="/assets/images/resources/schedule-one-1-8.jpg" alt="" />
                                        </div>
                                        <div className="schedule-one__address-and-btn-box">
                                        <ul className="list-unstyled schedule-one__address">
                                            <li>
                                            <div className="icon">
                                                <span className="icon-clock"></span>
                                            </div>
                                            <div className="text">
                                                <p>10 Am To 10 Pm <br /> 20 April 2024</p>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>Mirpur 01 Road N 12 Dhaka <br /> Bangladesh</p>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className="schedule-one__btn-box">
                                            <Link href="/contact" className="schedule-one__btn thm-btn">
                                                Buy Ticket <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="schedule-one__single">
                                        <div className="schedule-one__left">
                                        <h3 className="schedule-one__title">
                                            <Link href="/event-details">
                                            Sparkle & Shine <br /> Events
                                            </Link>
                                        </h3>
                                        <p className="schedule-one__text">
                                            A personal portfolio is a curated collection of <br /> an individual's professional work
                                        </p>
                                        </div>
                                        <div className="schedule-one__img">
                                        <img src="/assets/images/resources/schedule-one-1-9.jpg" alt="" />
                                        </div>
                                        <div className="schedule-one__address-and-btn-box">
                                        <ul className="list-unstyled schedule-one__address">
                                            <li>
                                            <div className="icon">
                                                <span className="icon-clock"></span>
                                            </div>
                                            <div className="text">
                                                <p>10 Am To 10 Pm <br /> 20 April 2024</p>
                                            </div>
                                            </li>
                                            <li>
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <div className="text">
                                                <p>Mirpur 01 Road N 12 Dhaka <br /> Bangladesh</p>
                                            </div>
                                            </li>
                                        </ul>
                                        <div className="schedule-one__btn-box">
                                            <Link href="/contact" className="schedule-one__btn thm-btn">
                                                Buy Ticket <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                        </div>
                                    </div>
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
