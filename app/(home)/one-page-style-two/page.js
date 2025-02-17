import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/onepagehome2/Banner"
import ScheduleTwo from "@/components/sections/onepagehome2/ScheduleTwo"
import ServicesTwo from "@/components/sections/onepagehome2/ServicesTwo"
import EventTwo from "@/components/sections/onepagehome2/EventTwo"
import CounterOne from "@/components/sections/onepagehome2/CounterOne"
import Brand from "@/components/sections/onepagehome2/Brand"
import ConferenceOne from "@/components/sections/onepagehome2/ConferenceOne"
import GalleryTwo from "@/components/sections/onepagehome2/GalleryTwo"
import Testimonial from "@/components/sections/onepagehome2/Testimonial"
import VideoOne from "@/components/sections/onepagehome2/VideoOne"
import TeamTwo from "@/components/sections/onepagehome2/TeamTwo"
import BlogTwo from "@/components/sections/onepagehome2/BlogTwo"
import PricingOne from "@/components/sections/onepagehome2/PricingOne"




export default function Home() {

    return (
        <div className="body-bg-color-2">
            <Layout headerStyle={6} footerStyle={2}>
                <Banner />
                <ScheduleTwo />
                <ServicesTwo />
                <EventTwo />
                <CounterOne />
                <Brand />
                <ConferenceOne />
                <GalleryTwo />
                <Testimonial />
                <VideoOne />
                <TeamTwo />
                <PricingOne />
                <BlogTwo />
            </Layout>
        </div>
    )
}