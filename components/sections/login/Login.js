'use client';

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    loop: true,
    effect: "fade",
    pagination: {
        el: "#main-slider-pagination",
        type: "bullets",
        clickable: true,
    },
    navigation: {
        nextEl: "#main-slider__swiper-button-next",
        prevEl: "#main-slider__swiper-button-prev",
    },
    autoplay: {
        delay: 8000,
    },
};

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [subscription, setSubscription] = useState([]);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state
        
        try {
            const response = await axios.post("http://localhost:1337/api/auth/local", {
                identifier: email,
                password: password,
            });
    
            const userEmail = response.data.user.email;
    
            // Save the token & user info in cookies
            document.cookie = `token=${response.data.jwt}; path=/; max-age=3600; Secure; SameSite=Strict`;
            document.cookie = `email=${userEmail}; path=/; max-age=3600; Secure; SameSite=Strict`;
            document.cookie = `documentId=${response.data.user.documentId}; path=/; max-age=3600; Secure; SameSite=Strict`;
    
            // Fetch subscription data
            const responsesub = await axios.get(`http://localhost:1337/api/subscriptions?filters[user][$eq]=${userEmail}`);
            console.log("Subscription Data:", responsesub);
    
            const subscribeData = responsesub.data.data.map((subscribe) => ({
                id: subscribe.id,
                documentId: subscribe.documentId,
                start_date: subscribe.start_date,
                end_date: subscribe.end_date,
                time_period_months: subscribe.time_period_months,
                subscription_fee: subscribe.subscription_fee
            }));
    
            setSubscription(subscribeData);
    
            // Check subscription expiration
            const currentDate = new Date();
            const isSubscriptionExpired = subscribeData.some((sub) => new Date(sub.end_date) < currentDate);
    
            console.log("Subscription Expired:", isSubscriptionExpired);
    
            // Redirect to home page with query param
            router.push(`/index-2?isSubscriptionExpired=${isSubscriptionExpired}`);
    
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password. Please try again.");
        }
    };
    

    return (
        <>
            {/* Login Section */}
            <section className="main-slider">
                <Swiper {...swiperOptions} className="swiper-container thm-swiper__slider">
                    <div className="swiper-wrapper">
                        <div className="main-slider__start-1">
                            <img src="assets/images/shapes/main-slider-star-1.png" alt="" />
                        </div>
                        <div className="main-slider__start-2 zoominout">
                            <img src="assets/images/shapes/main-slider-star-2.png" alt="" />
                        </div>
                        <div className="main-slider__start-3">
                            <img src="assets/images/shapes/main-slider-star-3.png" alt="" />
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="contact-one__inner">
                                    <h3 className="contact-one__title">Welcome Again</h3>
                                    <p className="contact-one__text">
                                        For your car we will do everything: advice, repairs, and maintenance. 
                                        We are the preferred choice for many.
                                    </p>
                                    <form className="contact-one__form" onSubmit={handleLogin}>
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6">
                                                <div className="contact-one__input-box">
                                                    <input
                                                        type="text"
                                                        name="Email"
                                                        placeholder="Enter your email"
                                                        required
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6">
                                                <div className="contact-one__input-box">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter your password"
                                                        required
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-xl-12">
                                                <div className="contact-one__btn-box">
                                                    <button type="submit" className="thm-btn contact-one__btn">
                                                        Login Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {error && <p className="error-message">{error}</p>}
                                    <p className="contact-one__text">
                                        If you're a new user, please{" "}
                                        <span>
                                            <Link href="/register">register</Link>
                                        </span>{" "}
                                        with your details.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Swiper>
                <div className="swiper-pagination" id="main-slider-pagination" />
            </section>
        </>
    );
}
