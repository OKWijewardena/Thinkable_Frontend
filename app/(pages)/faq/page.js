"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import React, { useState } from "react";
export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <>
      <Layout headerStyle={4} footerStyle={1} breadcrumbTitle="FAQ">
        <div>
          {/*FAQ One Start*/}
          <section className="faq-page">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <div className="faq-page__left">
                    <div
                      className="accrodion-grp faq-one-accrodion"
                      data-grp-name="faq-one-accrodion-1"
                    >
                      {[
                        {
                          question: "What is construction?",
                          answer:
                            "Et purus duis sollicitudin dignissim ha. Egest nulla quis venenatis cras sed eu massa eu faucibus. Urna fusce aenea tortor pretium Et purus duis sollicitudin dignissim habitant",
                        },
                        {
                          question: "How long does a project typically take?",
                          answer:
                            "Et purus duis sollicitudin dignissim ha. Egest nulla quis venenatis cras sed eu massa eu faucibus. Urna fusce aenea tortor pretium Et purus duis sollicitudin dignissim habitant",
                        },
                        {
                          question:
                            "What are the different types of construction projects?",
                          answer:
                            "Et purus duis sollicitudin dignissim ha. Egest nulla quis venenatis cras sed eu massa eu faucibus. Urna fusce aenea tortor pretium Et purus duis sollicitudin dignissim habitant",
                        },
                        {
                          question:
                            "What is the role of a construction manager?",
                          answer:
                            "Et purus duis sollicitudin dignissim ha. Egest nulla quis venenatis cras sed eu massa eu faucibus. Urna fusce aenea tortor pretium Et purus duis sollicitudin dignissim habitant",
                        },
                      ].map((item, index) => (
                        <div
                          className={`accrodion ${
                            activeIndex === index ? "active" : ""
                          }`}
                          key={index}
                        >
                          <div
                            className="accrodion-title"
                            onClick={() => toggleAccordion(index)}
                          >
                            <h4>{item.question}</h4>
                            <div className="faq-one-accrodion__count"></div>
                          </div>
                          {activeIndex === index && (
                            <div className="accrodion-content">
                              <div className="inner">
                                <p>{item.answer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="faq-page__right">
                    <div
                      className="accrodion-grp faq-one-accrodion"
                      data-grp-name="faq-one-accrodion-2"
                    >
                      {[
                        {
                          question: "What is construction?",
                          answer:
                            "Et purus duis sollicitudin dignissim ha. Egest nulla quis venenatis cras sed eu massa eu faucibus. Urna fusce aenea tortor pretium Et purus duis sollicitudin dignissim habitant",
                        },
                        {
                          question: "How long does a project typically take?",
                          answer:
                            "Et purus duis sollicitudin dignissim ha. Egest nulla quis venenatis cras sed eu massa eu faucibus. Urna fusce aenea tortor pretium Et purus duis sollicitudin dignissim habitant",
                        },
                        {
                          question:
                            "What are the different types of construction projects?",
                          answer:
                            "Et purus duis sollicitudin dignissim ha. Egest nulla quis venenatis cras sed eu massa eu faucibus. Urna fusce aenea tortor pretium Et purus duis sollicitudin dignissim habitant",
                        },
                        {
                          question:
                            "What is the role of a construction manager?",
                          answer:
                            "Et purus duis sollicitudin dignissim ha. Egest nulla quis venenatis cras sed eu massa eu faucibus. Urna fusce aenea tortor pretium Et purus duis sollicitudin dignissim habitant",
                        },
                      ].map((item, index) => (
                        <div
                          className={`accrodion ${
                            activeIndex === index + 4 ? "active" : ""
                          }`}
                          key={index + 4}
                        >
                          <div
                            className="accrodion-title"
                            onClick={() => toggleAccordion(index + 4)}
                          >
                            <h4>{item.question}</h4>
                            <div className="faq-one-accrodion__count"></div>
                          </div>
                          {activeIndex === index + 4 && (
                            <div className="accrodion-content">
                              <div className="inner">
                                <p>{item.answer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*FAQ One End*/}

          {/* CTA One Start */}
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
          {/* CTA One End */}
        </div>
      </Layout>
    </>
  );
}
