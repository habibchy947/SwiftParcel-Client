import Banner from "@/components/Banner";
import Features from "@/components/Features";
import TopDeliveryExpert from "@/components/TopDeliveryExpert";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            {/* TODO: STATS */}
            <TopDeliveryExpert></TopDeliveryExpert>
        </div>
    );
};

export default Home;