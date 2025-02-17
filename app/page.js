import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/home1/Banner"
import ServicesOne from "@/components/sections/home1/ServicesOne"
import EventOne from "@/components/sections/home1/EventOne"
import SlidingText from "@/components/sections/home1/SlidingText"
import BuyTicket from "@/components/sections/home1/BuyTicket"
import TeamOne from "@/components/sections/home1/TeamOne"
import EventDirection from "@/components/sections/home1/EventDirection"
import GalleryOne from "@/components/sections/home1/GalleryOne"
import ScheduleOne from "@/components/sections/home1/CategoryOne"
import Brand from "@/components/sections/home1/Brand"
import BlogOne from "@/components/sections/home1/BlogOne"
import CTAOne from "@/components/sections/home1/CTAOne"
import Login from "@/components/sections/login/Login"

// import Link from "next/link"
// import { Autoplay, Navigation, Pagination } from "swiper/modules"
// import { Swiper, SwiperSlide } from "swiper/react"

// const swiperOptions = {
//     modules: [Autoplay, Pagination, Navigation],
//     slidesPerView: 1,
//     loop: true,
//     effect: "fade",
//     pagination: {
//     el: "#main-slider-pagination",
//     type: "bullets",
//     clickable: true
//     },
//     navigation: {
//     nextEl: "#main-slider__swiper-button-next",
//     prevEl: "#main-slider__swiper-button-prev"
//     },
//     autoplay: {
//         delay: 8000
//     }
// }
export default function Home() {

    return (
        <>
            {/* <Layout headerStyle={1} footerStyle={1}>
                <Banner />
                <ServicesOne />
                <SlidingText />
                <EventOne />
                <BuyTicket />
                <TeamOne />
                <EventDirection />
                <GalleryOne />
                <ScheduleOne />
                <Brand />
                <BlogOne />
                <CTAOne />
            </Layout> */}
            <Login />
        </>
    )
}