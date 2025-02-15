import App_Stats from "@/components/App_Stats";
import Banner from "@/components/Banner";
import Features from "@/components/Features";
import TopDeliveryExpert from "@/components/TopDeliveryExpert";
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SwiftParcel | Home</title>
            </Helmet>
            <Banner></Banner>
            <Features></Features>
            <App_Stats></App_Stats>
            <TopDeliveryExpert></TopDeliveryExpert>
        </div>
    );
};

export default Home;