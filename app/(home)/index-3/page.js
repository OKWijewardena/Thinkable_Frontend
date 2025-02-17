import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/home3/Banner"
import FeatureOne from "@/components/sections/home3/FeatureOne"
import ScheduleThree from "@/components/sections/home3/ScheduleThree"
import TeamOne from "@/components/sections/home3/TeamOne"
import BuyTicket from "@/components/sections/home3/BuyTicket"
import TicketOne  from "@/components/sections/home3/TicketOne "
import Brand from "@/components/sections/home3/Brand"
import BlogOne from "@/components/sections/home3/BlogOne"
import CTAOne from "@/components/sections/home3/CTAOne"

export default function Home() {

    return (
        <>
            <Layout headerStyle={3} footerStyle={1}>
                <Banner />
                <FeatureOne />
                <ScheduleThree />
                <TeamOne />
                <BuyTicket />
                <TicketOne  />
                <Brand />
                <BlogOne />
                <CTAOne />
            </Layout>
        </>
    )
}