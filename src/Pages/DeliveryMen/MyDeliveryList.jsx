import DashboardHeader from '@/components/ui/DashboardHeader';
import Loading from '@/components/ui/Loading';
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyDeliveryList = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data: deliveryMen = {}, isLoading} = useQuery({
        queryKey: ['deliveryMen', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/deliveryMen/${user?.email}`)
            return res.data
        }
    })
    const {data: myDeliveryList = [], isLoading: isDeliveryLisLoading} = useQuery({
        queryKey: ['deliveryList', deliveryMen._id],
        queryFn: async() => {
            if(deliveryMen._id){
                const res = await axiosSecure.get(`/deliveryList/${deliveryMen._id}`)
                return res.data
            }
            return []
        }
    })
    console.log(myDeliveryList)
    if(isLoading || isDeliveryLisLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <DashboardHeader title={`My Delivery List (${myDeliveryList.length})`}></DashboardHeader>
            
        </div>
    );
};

export default MyDeliveryList;