
'use client'
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    loop: true,
    effect: "fade",
    pagination: {
    el: "#main-slider-pagination",
    type: "bullets",
    clickable: true
    },
    navigation: {
    nextEl: "#main-slider__swiper-button-next",
    prevEl: "#main-slider__swiper-button-prev"
    },
    autoplay: {
        delay: 8000
    }
}

export default function Banner() {
    return (
       
        <>
        {/* banner-one */}
        <section className="main-slider" id="home">
            <Swiper {...swiperOptions} className="swiper-container thm-swiper__slider">
            <div className="swiper-wrapper">
              <SwiperSlide className="swiper-slide">
                <div className="main-slider__img">
                  <img src="assets/images/resources/main-slider-img-1-1.jpg" alt="" />
                </div>
                <div className="main-slider__shpae-1">
                  <img src="assets/images/shapes/main-slider-shape-1.png" alt="" />
                </div>
                <div className="main-slider__shpae-2">
                  <img src="assets/images/shapes/main-slider-shape-2.png" alt="" />
                </div>
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
                    <div className="col-xl-12">
                      <div className="main-slider__content">
                        <p className="main-slider__sub-title">Music Festival</p>
                        <h2 className="main-slider__title">
                          Discover a World <br /> <span>of Celebration</span>
                        </h2>
                        <p className="main-slider__text">
                          As an AI language model, I don't have personal opinions or points of view. 
                          However, I <br /> can tell you that design is a multifaceted field that encompasses various elements.
                        </p>
                        <ul className="list-unstyled main-slider__address">
                          <li>
                            <div className="icon">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>Mirpur 01 Road N 12 Dhaka Bangladesh</p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-clock"></span>
                            </div>
                            <div className="text">
                              <p>10 Am To 10 Pm 20 April 2024</p>
                            </div>
                          </li>
                        </ul>
                        <div className="main-slider__btn-box">
                          <Link href="/contact" className="main-slider__btn thm-btn">
                            Purchase Ticket
                            <span className="icon-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide">
                <div className="main-slider__img">
                  <img src="assets/images/resources/main-slider-img-1-2.jpg" alt="" />
                </div>
                <div className="main-slider__shpae-1">
                  <img src="assets/images/shapes/main-slider-shape-1.png" alt="" />
                </div>
                <div className="main-slider__shpae-2">
                  <img src="assets/images/shapes/main-slider-shape-2.png" alt="" />
                </div>
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
                    <div className="col-xl-12">
                      <div className="main-slider__content">
                        <p className="main-slider__sub-title">Music Festival</p>
                        <h2 className="main-slider__title">
                          Discover a World <br /> <span>of Celebration</span>
                        </h2>
                        <p className="main-slider__text">
                          As an AI language model, I don't have personal opinions or points of view. 
                          However, I <br /> can tell you that design is a multifaceted field that encompasses various elements.
                        </p>
                        <ul className="list-unstyled main-slider__address">
                          <li>
                            <div className="icon">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>Mirpur 01 Road N 12 Dhaka Bangladesh</p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-clock"></span>
                            </div>
                            <div className="text">
                              <p>10 Am To 10 Pm 20 April 2024</p>
                            </div>
                          </li>
                        </ul>
                        <div className="main-slider__btn-box">
                          <Link href="/contact" className="main-slider__btn thm-btn">
                            Purchase Ticket
                            <span className="icon-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide">
                <div className="main-slider__img">
                  <img src="assets/images/resources/main-slider-img-1-3.jpg" alt="" />
                </div>
                <div className="main-slider__shpae-1">
                  <img src="assets/images/shapes/main-slider-shape-1.png" alt="" />
                </div>
                <div className="main-slider__shpae-2">
                  <img src="assets/images/shapes/main-slider-shape-2.png" alt="" />
                </div>
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
                    <div className="col-xl-12">
                      <div className="main-slider__content">
                        <p className="main-slider__sub-title">Music Festival</p>
                        <h2 className="main-slider__title">
                          Discover a World <br /> <span>of Celebration</span>
                        </h2>
                        <p className="main-slider__text">
                          As an AI language model, I don't have personal opinions or points of view.
                          However, I <br /> can tell you that design is a multifaceted field that encompasses various elements.
                        </p>
                        <ul className="list-unstyled main-slider__address">
                          <li>
                            <div className="icon">
                              <span className="icon-pin" />
                            </div>
                            <div className="text">
                              <p>Mirpur 01 Road N 12 Dhaka Bangladesh</p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-clock" />
                            </div>
                            <div className="text">
                              <p>10 Am To 10 Pm 20 April 2024</p>
                            </div>
                          </li>
                        </ul>
                        <div className="main-slider__btn-box">
                          <Link href="/contact" className="main-slider__btn thm-btn">
                            Purchase Ticket <span className="icon-arrow-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

            </div>
          </Swiper>
          <div className="swiper-pagination" id="main-slider-pagination" />

        </section>
        {/* banner-one */}
      </>
    )
}
