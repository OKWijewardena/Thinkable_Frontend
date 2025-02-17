import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/onepagehome1/Banner"
import ServicesOne from "@/components/sections/onepagehome1/ServicesOne"
import EventOne from "@/components/sections/onepagehome1/EventOne"
import SlidingText from "@/components/sections/onepagehome1/SlidingText"
import BuyTicket from "@/components/sections/onepagehome1/BuyTicket"
import TeamOne from "@/components/sections/onepagehome1/TeamOne"
import EventDirection from "@/components/sections/onepagehome1/EventDirection"
import GalleryOne from "@/components/sections/onepagehome1/GalleryOne"
import ScheduleOne from "@/components/sections/onepagehome1/ScheduleOne"
import Brand from "@/components/sections/onepagehome1/Brand"
import BlogOne from "@/components/sections/onepagehome1/BlogOne"
import CTAOne from "@/components/sections/onepagehome1/CTAOne"
export default function Home() {

    return (
        <>
            <Layout headerStyle={5} footerStyle={1}>
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
            </Layout>
        </>
    )
}