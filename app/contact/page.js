"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
export default function Home() {

  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    user: "",
    message: "",
  });

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const email = getCookie("email");
  console.log("User Email:", email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        data: formData, // Wrapping the form data inside "data" key
      };
  
      const response = await axios.post('http://localhost:1337/api/messages', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Message sent:', response.data);
      alert('Message added successfully!');
    } catch (error) {
      console.error("Error in sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="CONTACT US">
        <div>
          {/*Contact One Start*/}
          <section className="contact-one">
            <div className="container">
              <div className="contact-one__inner">
                <h3 className="contact-one__title">Write here below?</h3>
                <p className="contact-one__text">
                  For your car we will do everything advice, repairs and they
                  can maintenance. We are the some preferred choice
                </p>
                <form
                  className="contact-form-validated contact-one__form"
                  action="assets/inc/sendemail.php"
                  method="post"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="row">
                    <div className="col-xl-6 col-lg-6">
                      <div className="contact-one__input-box">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                      onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                      <div className="contact-one__input-box">
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={email}
                      onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                      <div className="contact-one__input-box">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.contact_number}
                      onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="contact-one__input-box text-message-box">
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          value={formData.message}
                      onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="contact-one__btn-box">
                        <button
                          type="submit"
                          className="thm-btn contact-one__btn"
                        >
                          Submit Now<span className="icon-arrow-right"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="result"></div>
              </div>
            </div>
          </section>
          {/*Contact One End*/}

          {/*Contact Two Start*/}
          <section className="contact-two">
            <div className="container">
              <div className="row">
                {/* Contact Two Single Start */}
                <div className="col-xl-4 col-lg-4">
                  <div className="contact-two__single">
                    <div className="contact-two__icon">
                      <span className="icon-pin"></span>
                    </div>
                    <h3 className="contact-two__title">Location</h3>
                    <p className="contact-two__text">
                      2972 Westheimer Rd. Santa Ana, <br />
                      Illinois 85486
                    </p>
                  </div>
                </div>
                {/* Contact Two Single End */}

                {/* Contact Two Single Start */}
                <div className="col-xl-4 col-lg-4">
                  <div className="contact-two__single">
                    <div className="contact-two__icon">
                      <span className="icon-paper-plan"></span>
                    </div>
                    <h3 className="contact-two__title">E-mail</h3>
                    <p className="contact-two__text">
                      <a href="mailto:tim.jennings@example.com">
                        tim.jennings@example.com
                      </a>
                    </p>
                    <p className="contact-two__text">
                      <a href="mailto:debra.holt@example.com">
                        debra.holt@example.com
                      </a>
                    </p>
                  </div>
                </div>
                {/* Contact Two Single End */}

                {/* Contact Two Single Start */}
                <div className="col-xl-4 col-lg-4">
                  <div className="contact-two__single">
                    <div className="contact-two__icon">
                      <span className="icon-call"></span>
                    </div>
                    <h3 className="contact-two__title">Contact</h3>
                    <p className="contact-two__text">
                      <a href="tel:019457896332">019457896332</a>,{" "}
                      <a href="tel:017485962546">017485962546</a>
                    </p>
                    <p className="contact-two__text">
                      <a href="tel:016457896333">016457896333</a>
                    </p>
                  </div>
                </div>
                {/* Contact Two Single End */}
              </div>
            </div>
          </section>
          {/*Contact Two End*/}

          {/*CTA One Start*/}
          <section className="cta-one">
            <div className="container">
              <div className="cta-one__inner">
                <h3 className="cta-one__title">
                  Get Latest Updates Subscribe <br /> to Our Newsletter
                </h3>
                <form
                  className="cta-one__form mc-form"
                  data-url="MC_FORM_URL"
                  noValidate
                >
                  <div className="cta-one__form-input-box">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      name="EMAIL"
                    />
                    <button type="submit" className="cta-one__btn">
                      <span className="icon-paper-plan"></span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
          {/*CTA One End*/}
        </div>
      </Layout>
    </>
  );
}
