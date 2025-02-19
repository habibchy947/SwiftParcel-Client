import App_Stats from "@/components/App_Stats";
import Banner from "@/components/Banner";
import Features from "@/components/Features";
import LatestBlog from "@/components/LatestBlog";
import ParcelManagementSteps from "@/components/ParcelManagementSteps";
import Testimonials from "@/components/Testimonials";
import TopDeliveryExpert from "@/components/TopDeliveryExpert";
import TrustedOrganization from "@/components/NewsLetter";
import { Helmet } from "react-helmet-async";
import NewsLetter from "@/components/NewsLetter";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SwiftParcel | Home</title>
            </Helmet>
            <Banner></Banner>
            <ParcelManagementSteps></ParcelManagementSteps>
            <Features></Features>
            <App_Stats></App_Stats>
            <LatestBlog></LatestBlog>
            <TopDeliveryExpert></TopDeliveryExpert>
            <Testimonials></Testimonials>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;