import React from "react";
import Layout from "@/components/layout/Layout";
const testimonials = [
  {
    clientName: "Jonathon Doe",
    role: "Officer",
    clientImage: "assets/images/testimonial/testimonial-one-client-1-1.jpg",
    text: "Events are special occasions where people gather together to celebrate, commemorate, or participate in a specific purpose or theme.",
    rating: 4,
  },
  {
    clientName: "Jonathon Cample",
    role: "Designer",
    clientImage: "assets/images/testimonial/testimonial-one-client-1-2.jpg",
    text: "Events are special occasions where people gather together to celebrate, commemorate, or participate in a specific purpose or theme.",
    rating: 4,
  },
  {
    clientName: "Jonathon Trot",
    role: "Officer",
    clientImage: "assets/images/testimonial/testimonial-one-client-1-3.jpg",
    text: "Events are special occasions where people gather together to celebrate, commemorate, or participate in a specific purpose or theme.",
    rating: 4,
  },
  {
    clientName: "Jonathon Smith",
    role: "Designer",
    clientImage: "assets/images/testimonial/testimonial-one-client-1-4.jpg",
    text: "Events are special occasions where people gather together to celebrate, commemorate, or participate in a specific purpose or theme.",
    rating: 4,
  },
  {
    clientName: "Abral Sing",
    role: "Designer",
    clientImage: "assets/images/testimonial/testimonial-one-client-1-4.jpg",
    text: "Events are special occasions where people gather together to celebrate, commemorate, or participate in a specific purpose or theme.",
    rating: 4,
  },
  {
    clientName: "Hasil Khan",
    role: "Designer",
    clientImage: "assets/images/testimonial/testimonial-one-client-1-6.jpg",
    text: "Events are special occasions where people gather together to celebrate, commemorate, or participate in a specific purpose or theme.",
    rating: 4,
  },
];
export default function Home() {
  return (
    <>
      <Layout
        headerStyle={4}
        footerStyle={1}
        breadcrumbTitle="Our Testimonials"
      >
        <div>
          {/*Testimonials Page Start*/}
          <section className="testimonial-page">
            <div className="container">
              <div className="row">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="col-xl-6 col-lg-6 col-md-6">
                    <div className="testimonial-one__single">
                      <div className="testimonial-one__client-info-and-review">
                        <div className="testimonial-one__client-info">
                          <div className="testimonial-one__client-img">
                            <img
                              src={testimonial.clientImage}
                              alt={testimonial.clientName}
                            />
                          </div>
                          <div className="testimonial-one__client-content">
                            <h4 className="testimonial-one__client-name">
                              <a href="testimonials">
                                {testimonial.clientName}
                              </a>
                            </h4>
                            <p className="testimonial-one__sub-title">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        <div className="testimonial-one__review">
                          {Array.from(
                            { length: testimonial.rating },
                            (_, i) => (
                              <span key={i} className="icon-star"></span>
                            )
                          )}
                          {Array.from(
                            { length: 5 - testimonial.rating },
                            (_, i) => (
                              <span
                                key={i + testimonial.rating}
                                className="icon-star clr-start"
                              ></span>
                            )
                          )}
                        </div>
                      </div>
                      <p className="testimonial-one__text">
                        {testimonial.text}
                      </p>
                      <div className="testimonial-one__quote">
                        <span className="icon-quote"></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/*Testimonials Page End*/}

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
