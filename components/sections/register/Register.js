'use client'
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
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

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Reset error state before new attempt

    // Validate confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth/local/register",
        {
          username: name,
          email: email,
          password: password,
        }
      );

      document.cookie = `token=${response.data.jwt}; path=/; max-age=3600; Secure; SameSite=Strict`;
      document.cookie = `email=${response.data.user.email}; path=/; max-age=3600; Secure; SameSite=Strict`;
      document.cookie = `documentId=${response.data.user.documentId}; path=/; max-age=3600; Secure; SameSite=Strict`;

      await axios.post("http://localhost:1337/api/profiles", {
        data: {
          name: name,
          address: address,
          user: email,
          contact_number: contact,
        },
      });


      // Navigate to the home page
      window.location.href = "/";
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <>
      {/* Register-one */}
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
                  <h3 className="contact-one__title">Register as a new user</h3>
                  <p className="contact-one__text">
                    For your car we will do everything advice, repairs and they
                    can maintenance. We are the some preferred choice
                  </p>
                  <form
                    className="contact-form-validated contact-one__form"
                    noValidate
                    onSubmit={handleRegister}
                  >
                    <div className="row">
                      <div className="col-xl-6 col-lg-6">
                        <div className="contact-one__input-box">
                          <input
                            type="text"
                            name="Name"
                            placeholder="Enter your name"
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="contact-one__input-box">
                          <input
                            type="email"
                            name="Email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="contact-one__input-box">
                          <input
                            type="text"
                            name="Contact Number"
                            placeholder="Enter contact number"
                            required
                            onChange={(e) => setContact(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="contact-one__input-box">
                          <input
                            type="text"
                            name="Address"
                            placeholder="Enter your address"
                            required
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="contact-one__input-box">
                          <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="contact-one__input-box">
                          <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-xl-12">
                        <div className="contact-one__btn-box">
                          <button
                            type="submit"
                            className="thm-btn contact-one__btn"
                          >
                            Register Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  {error && <p className="error-message">{error}</p>}
                  <div className="result"></div>
                  <p className="contact-one__text">
                    If you're registered as a new user, please{" "}
                    <span>
                      <Link href="/">login</Link>
                    </span>{" "}
                    to your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Swiper>
        <div className="swiper-pagination" id="main-slider-pagination" />
      </section>
      {/* Register-one */}
    </>
  );
}
