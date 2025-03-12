"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Layout from "@/components/layout/Layout"
import Banner from "@/components/sections/home1/Banner"
import ServicesOne from "@/components/sections/home1/ServicesOne"
import EventOne from "@/components/sections/home1/EventOne"
import SlidingText from "@/components/sections/home1/SlidingText"
import BuyTicket from "@/components/sections/home1/BuyTicket"
import TeamOne from "@/components/sections/home1/TeamOne"
import EventDirection from "@/components/sections/home1/EventDirection"
import GalleryOne from "@/components/sections/home1/GalleryOne"
import CategoryOne from "@/components/sections/home1/CategoryOne"
import Brand from "@/components/sections/home1/Brand"
import BlogOne from "@/components/sections/home1/BlogOne"
import CTAOne from "@/components/sections/home1/CTAOne"
export default function Home() {

    const [subscription, setSubscription] = useState([]);
    const [showDialog, setShowDialog] = useState(true);


    // Function to get a cookie value by name
  const getCookie = (name) => {
    if (typeof window !== "undefined") {
      // Only access document.cookie in the browser
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
    return null;
  };
  
  const email = getCookie("email");
  console.log("User Email:", email);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async() => {
    try {
      const response = await axios.get(`http://localhost:1337/api/subscriptions?filters[user][$eq]=${email}`);
        console.log(response);

        const subscribeData = response.data.data.map((subscribe) => ({
          id: subscribe.id,
          documentId: subscribe.documentId,
          start_date: subscribe.start_date,
          end_date: subscribe.end_date,
          time_period_months: subscribe.time_period_months,
          subscription_fee: subscribe.subscription_fee
        }));
        
        console.log("subscription Data:",response);
        setSubscription(subscribeData);
      
    } catch (error) {
      console.error("Error fetching subscribes:", error);
    }
  }

  const searchParams = useSearchParams();
    const isSubscriptionExpired = searchParams.get("isSubscriptionExpired") === "true";

    const currentDate = new Date();

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <Banner />
                <ServicesOne />
                <SlidingText />
                <EventOne />
                <BuyTicket />
                <TeamOne />
                <GalleryOne />
                <CategoryOne />
                <Brand />
                <CTAOne />
                {/* Subscription Expired Dialog */}
{isSubscriptionExpired && showDialog && (
    <div className="dialog-backdrop">
        <div className="dialog-box">
            {/* Close Button */}
            <button className="dialog-close-btn" onClick={() => setShowDialog(false)}>
                ×
            </button>
            <h3>Renew your subscription</h3>
            <p>Your subscription expired on:</p>
            <ul>
                {subscription
                    .filter((sub) => new Date(sub.end_date) < currentDate)
                    .map((expiredSub) => (
                        <li key={expiredSub.id}>
                        {new Date(expiredSub.end_date).toLocaleDateString()}
                        </li>
                    ))}
            </ul>
            <br/>
            <Link className="blog-one__btn-2 thm-btn" href={{
                                  pathname: "/subscription"
                                }} > Buy Subscription </Link>
        </div>
    </div>
)}

            </Layout>
        </>
    )
}