import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/onepagehome3/Banner"
import FeatureOne from "@/components/sections/onepagehome3/FeatureOne"
import ScheduleThree from "@/components/sections/onepagehome3/ScheduleThree"
import TeamOne from "@/components/sections/onepagehome3/TeamOne"
import BuyTicket from "@/components/sections/onepagehome3/BuyTicket"
import TicketOne  from "@/components/sections/onepagehome3/TicketOne "
import Brand from "@/components/sections/onepagehome3/Brand"
import BlogOne from "@/components/sections/onepagehome3/BlogOne"
import CTAOne from "@/components/sections/onepagehome3/CTAOne"

export default function Home() {

    return (
        <>
            <Layout headerStyle={7} footerStyle={1}>
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