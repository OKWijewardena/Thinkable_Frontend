import React from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

const member = {
  name: "Mike Hussey",
  role: "Lead Speaker",
  img: "/assets/images/team/team-details-client-img.jpg",
  biography:
    "We’re inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, try new things, to be vulnerable, epic adventures oday most people get on average 4 to 6 hours of exercise every day, and make sure that everything they put in their mouths is not filled with sugars",
  personalInfo:
    "We’re inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, try new things, to be vulnerable, epic adventures oday most people get on average 4 to 6 hours of exercise every day, and make sure.",
  dateOfBirth: "May 10, 1980",
  address: "PO Box 16122 Collins Street West Victoria 8007 New York",
  social: {
    facebook: "#",
    twitter: "#",
    pinterest: "#",
  },
};
const services = [
  {
    title: "Eventful Ventures",
    description:
      "Events bring people together for a shared experience and from weddings.",
    icon: "icon-camera",
    detailsLink: "/service-details",
    readMoreLink: "#",
  },
  {
    title: "Stellar Events Co",
    description:
      "Events bring people together for a shared experience and from weddings.",
    icon: "icon-skewer",
    detailsLink: "/service-details",
    readMoreLink: "#",
  },
  {
    title: "Elite Event Management",
    description:
      "Events bring people together for a shared experience and from weddings.",
    icon: "icon-dinner-table",
    detailsLink: "/service-details",
    readMoreLink: "#",
  },
];
export default function Home() {
  return (
    <>
      <Layout headerStyle={4} footerStyle={1} breadcrumbTitle="Team Details">
        <div>
          {/*Team Details Info Start*/}
          <section className="team-details">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5">
                  <div className="team-details__left">
                    <div className="team-details__client-shape-1">
                      <img
                        src="/assets/images/shapes/team-details-client-shape-1.png"
                        alt=""
                      />
                    </div>
                    <div className="team-details__img-box">
                      <div className="team-details__client-img">
                        <img src={member.img} alt={member.name} />
                      </div>
                      <div className="team-details__img-content">
                        <h3 className="team-details__client-name">
                          {member.name}
                        </h3>
                        <p className="team-details__sub-title">{member.role}</p>
                        <div className="team-details__social">
                          <ul className="team-details__social-list list-unstyled">
                            <li>
                              <a
                                className="share-facebook"
                                href={member.social.facebook}
                              >
                                <i className="fab fa-facebook-f"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="share-twitter"
                                href={member.social.twitter}
                              >
                                <i className="fab fa-twitter"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                className="share-pinterest"
                                href={member.social.pinterest}
                              >
                                <i className="fab fa-pinterest-p"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7">
                  <div className="team-details__right">
                    <h3 className="team-details__title-1">Biography</h3>
                    <p className="team-details__text-1">{member.biography}</p>
                    <div className="team-details__speaker-info-box">
                      <div className="row">
                        <div className="col-md-7">
                          <div className="team-details__speaker-info">
                            <h3 className="team-details__speaker-title">
                              Personal Information
                            </h3>
                            <p>{member.personalInfo}</p>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="team-details__speaker-info-list">
                            <ul className="list-unstyled">
                              <li>
                                <p className="title">Date Of Birth:</p>
                                <span>{member.dateOfBirth}</span>
                              </li>
                              <li>
                                  <p className="title">Mobile Number:</p>
                                  <a href="tel:001232347684">001 2323 47684</a>
                              </li>
                              <li>
                                <p className="title">Address:</p>
                                <span>{member.address}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*Team Details Info End*/}

          <section className="services-one services-three">
            <div className="container">
              <div className="section-title text-center">
                <div className="section-title__tagline-box">
                  <span className="section-title__tagline">event benefits</span>
                </div>
                <h2 className="section-title__title">
                  Why should you join <br /> our event
                </h2>
              </div>
              <div className="row">
                {services.map((service, index) => (
                  <div key={index} className="col-xl-4 col-lg-4">
                    <div className="services-one__single">
                      <div className="services-one__icon">
                        <span className={service.icon}></span>
                      </div>
                      <h3 className="services-one__title">
                        <a href={service.detailsLink}>{service.title}</a>
                      </h3>
                      <p className="services-one__text">
                        {service.description}
                      </p>
                      <a
                        href={service.readMoreLink}
                        className="services-one__read-more"
                      >
                        Read More <span className="icon-arrow-right"></span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

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
