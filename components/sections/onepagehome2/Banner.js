
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
        <section className="main-slider-two" id="home">
            <Swiper {...swiperOptions} className="swiper-container thm-swiper__slider">
            <div className="swiper-wrapper">
            <SwiperSlide className="swiper-slide">
                <div className="container">
                    <div className="row">
                    <div className="col-xl-6">
                        <div className="main-slider-two__content">
                        <p className="main-slider-two__sub-title">The Events</p>
                        <h2 className="main-slider-two__title">
                            Celebrate <br />
                            <span className="color-text">Life's Special</span>
                            <br />
                            Moments
                        </h2>
                        <div className="main-slider-two__btn-box">
                            <Link href="/contact" className="main-slider-two__btn thm-btn">
                                Purchase Ticket <span className="icon-arrow-right"></span>
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="main-slider-two__img-box">
                        <div className="main-slider-two__img">
                            <img src="/assets/images/resources/main-slider-two-img-1-1.jpg" alt="Main Slider Image" />
                        </div>
                        <div className="main-slider-two__shape-1">
                            <img src="/assets/images/shapes/main-slider-two-shape-1.png" alt="Shape 1" />
                        </div>
                        <div className="main-slider-two__shape-2">
                            <img src="/assets/images/shapes/main-slider-two-shape-2.png" alt="Shape 2" />
                        </div>
                        <div className="main-slider-two__shape-3 float-bob-x">
                            <img src="/assets/images/shapes/main-slider-two-shape-3.png" alt="Shape 3" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <div className="container">
                    <div className="row">
                    <div className="col-xl-6">
                        <div className="main-slider-two__content">
                        <p className="main-slider-two__sub-title">The Events</p>
                        <h2 className="main-slider-two__title">
                            Celebrate <br />
                            <span className="color-text">Life's Special</span>
                            <br />
                            Moments
                        </h2>
                        <div className="main-slider-two__btn-box">
                            <Link href="/contact" className="main-slider-two__btn thm-btn">
                                Purchase Ticket <span className="icon-arrow-right"></span>
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="main-slider-two__img-box">
                        <div className="main-slider-two__img">
                            <img src="/assets/images/resources/main-slider-two-img-1-2.jpg" alt="Main Slider Image" />
                        </div>
                        <div className="main-slider-two__shape-1">
                            <img src="/assets/images/shapes/main-slider-two-shape-1.png" alt="Shape 1" />
                        </div>
                        <div className="main-slider-two__shape-2">
                            <img src="/assets/images/shapes/main-slider-two-shape-2.png" alt="Shape 2" />
                        </div>
                        <div className="main-slider-two__shape-3 float-bob-x">
                            <img src="/assets/images/shapes/main-slider-two-shape-3.png" alt="Shape 3" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
                <div className="container">
                    <div className="row">
                    <div className="col-xl-6">
                        <div className="main-slider-two__content">
                        <p className="main-slider-two__sub-title">The Events</p>
                        <h2 className="main-slider-two__title">
                            Celebrate <br />
                            <span className="color-text">Life's Special</span>
                            <br />
                            Moments
                        </h2>
                        <div className="main-slider-two__btn-box">
                            <Link href="/contact" className="main-slider-two__btn thm-btn">
                                Purchase Ticket <span className="icon-arrow-right"></span>
                            </Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="main-slider-two__img-box">
                        <div className="main-slider-two__img">
                            <img src="/assets/images/resources/main-slider-two-img-1-3.jpg" alt="Main Slider Image" />
                        </div>
                        <div className="main-slider-two__shape-1">
                            <img src="/assets/images/shapes/main-slider-two-shape-1.png" alt="Shape 1" />
                        </div>
                        <div className="main-slider-two__shape-2">
                            <img src="/assets/images/shapes/main-slider-two-shape-2.png" alt="Shape 2" />
                        </div>
                        <div className="main-slider-two__shape-3 float-bob-x">
                            <img src="/assets/images/shapes/main-slider-two-shape-3.png" alt="Shape 3" />
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
