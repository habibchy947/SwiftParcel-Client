import useAxiosPublic from "@/Hooks/useAxiosPublic";
import DeliveryManCard from "./ui/DeliveryManCard";
import Header from "./ui/Header";
import { useQuery } from "@tanstack/react-query";

const TopDeliveryExpert = () => {
    const axiosPublic = useAxiosPublic()
    const {data: deliveryMens = []} = useQuery({
        queryKey:['top-delivery-men'],
        queryFn: async () => {
            const res = await axiosPublic.get('/top-delivery-men')
            return res.data
        }
    })
    return (
        <div className="w-11/12 mx-auto mb-20">
            <Header title='Top Delivery Expert'></Header>
            <div className="grid grid-cols1 md:grid-cols-3 gap-5 lg:gap-7">
            {
                deliveryMens.map((deliveryMen) =><DeliveryManCard key={deliveryMen._id} deliveryMen={deliveryMen}></DeliveryManCard>)
            }
            
            </div>
        </div>
    );
};

export default TopDeliveryExpert;