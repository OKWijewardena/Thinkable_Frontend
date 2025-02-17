import Layout from "@/components/layout/Layout";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Layout
        headerStyle={4}
        footerStyle={1}
        breadcrumbTitle="Gallery Details US"
      >
        <>
          <section className="gallery-details">
            <div className="container">
              <div className="gallery-details__top">
                <div className="row">
                  <div className="col-xl-8 col-lg-7">
                    <div className="gallery-details__top-img">
                      <img
                        src="/assets/images/gallery/gallery-details-img-1.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-5">
                    <div className="gallery-details__top-right">
                      <div className="gallery-details__information">
                        <div className="gallery-details__information-title">
                          <h3>Project Information</h3>
                        </div>
                        <ul className="gallery-details__information-list list-unstyled">
                          <li>
                            <p>Event Management</p>
                          </li>
                          <li>
                            <p>Starline Shimlasi</p>
                          </li>
                          <li>
                            <p>1 April 2024</p>
                          </li>
                          <li>
                            <p>28 September 2025</p>
                          </li>
                          <li>
                            <div className="gallery-details__information-rating">
                              <span className="icon-star"></span>
                              <span className="icon-star"></span>
                              <span className="icon-star"></span>
                              <span className="icon-star"></span>
                              <span className="icon-star last-icon"></span>
                            </div>
                          </li>
                        </ul>
                        <div className="gallery-details__information-social">
                          <a href="#">
                            <span className="icon-instagram"></span>
                          </a>
                          <a href="#">
                            <span className="icon-facebook"></span>
                          </a>
                          <a href="#">
                            <span className="icon-fi"></span>
                          </a>
                          <a href="#">
                            <span className="icon-linkedin-in"></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gallery-details__content">
                <h3 className="gallery-details__title-1">
                  Celebrate in Style Celebrate with Class
                </h3>
                <p className="gallery-details__text-1">
                  Web designing in a powerful way of just not an only
                  profession, however, in a passion for our Company. We have to
                  a tendency to believe the idea that smart looking of any
                  website in on visitors. Web designing in a powerful way of
                  just not an only profession.
                </p>
                <div className="gallery-details__points-box">
                  <ul className="gallery-details__points list-unstyled">
                    <li>
                      <div className="icon">
                        <span className="icon-double-angle"></span>
                      </div>
                      <p>Creating Memories, One Event at a Time</p>
                    </li>
                    <li>
                      <div className="icon">
                        <span className="icon-double-angle"></span>
                      </div>
                      <p>Celebrate in Style, Celebrate with Class</p>
                    </li>
                  </ul>
                  <ul className="gallery-details__points list-unstyled">
                    <li>
                      <div className="icon">
                        <span className="icon-double-angle"></span>
                      </div>
                      <p>Where Events Come to Life</p>
                    </li>
                    <li>
                      <div className="icon">
                        <span className="icon-double-angle"></span>
                      </div>
                      <p>Making Your Event Dreams Come True</p>
                    </li>
                  </ul>
                  <ul className="gallery-details__points list-unstyled">
                    <li>
                      <div className="icon">
                        <span className="icon-double-angle"></span>
                      </div>
                      <p>Creating Memories, One Event at a Time</p>
                    </li>
                    <li>
                      <div className="icon">
                        <span className="icon-double-angle"></span>
                      </div>
                      <p>
                        Purpose of an event is to create memorable experiences
                      </p>
                    </li>
                  </ul>
                </div>
                <h3 className="gallery-details__title-2">
                  Celebrate Life Celebrate with Us
                </h3>
                <p className="gallery-details__text-2">
                  Web designing in a powerful way of just not an only
                  profession, however, in a passion for our Company. We have to
                  a tendency to believe the idea that smart looking of any
                  website in on visitors.
                </p>
              </div>
              <div className="gallery-details__img-box">
                <div className="row">
                  <div className="col-xl-4 col-lg-4">
                    <div className="gallery-details__img-box-img">
                      <img
                        src="/assets/images/gallery/gallery-details-img-box-img-1.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <div className="gallery-details__img-box-img">
                      <img
                        src="/assets/images/gallery/gallery-details-img-box-img-2.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4">
                    <div className="gallery-details__img-box-img">
                      <img
                        src="/assets/images/gallery/gallery-details-img-box-img-3.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
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
        </>
      </Layout>
    </>
  );
}
