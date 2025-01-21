import App_Stats from "@/components/App_Stats";
import Banner from "@/components/Banner";
import Features from "@/components/Features";
import TopDeliveryExpert from "@/components/TopDeliveryExpert";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <App_Stats></App_Stats>
            <TopDeliveryExpert></TopDeliveryExpert>
        </div>
    );
};

export default Home;