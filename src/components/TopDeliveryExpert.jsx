import DeliveryManCard from "./ui/DeliveryManCard";
import Header from "./ui/Header";

const TopDeliveryExpert = () => {
    return (
        <div className="w-11/12 mx-auto">
            <Header title='Top Delivery Expert'></Header>
            <div className="grid grid-cols1 md:grid-cols-3 gap-5">
            <DeliveryManCard></DeliveryManCard>
            <DeliveryManCard></DeliveryManCard>
            <DeliveryManCard></DeliveryManCard>
            </div>
        </div>
    );
};

export default TopDeliveryExpert;