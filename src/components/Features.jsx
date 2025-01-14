import { useQuery } from "@tanstack/react-query";
import Header from "./ui/Header";
import axios from "axios";
import FeaureCard from "./ui/FeaureCard";

const Features = () => {
    const {data: features=[]} = useQuery({
        queryKey: ['features'],
        queryFn: async () => {
            const {data} = await axios('/feautures.json')
            return data
        }
    })
    console.log(features)
    return (
        <div className="w-11/12 mx-auto">
            <Header title={'Our Features'}></Header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {
                    features.map((feature, idx) => <FeaureCard key={idx} feature={feature}></FeaureCard>)
                }
            </div>
        </div>
    );
};

export default Features;