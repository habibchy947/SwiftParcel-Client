import DashboardHeader from '@/components/ui/DashboardHeader';
import Loading from '@/components/ui/Loading';
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import React from 'react';

const MyReviews = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: deliveryMen = {}, isLoading } = useQuery({
        queryKey: ['deliveryMens', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/deliveryMen/${user?.email}`)
            return res.data
        }
    })
    console.log(deliveryMen._id)
    const { data: reviews = [], isLoading: isDeliveryLisLoading, refetch } = useQuery({
        queryKey: ['reviews', deliveryMen._id],
        queryFn: async () => {
            if (deliveryMen._id) {
                const res = await axiosSecure.get(`/review/${deliveryMen._id}`)
                return res.data
            }
            return []
        }
    })
    console.log(reviews)
    if (isLoading || isDeliveryLisLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <DashboardHeader title={'My Reviews'}></DashboardHeader>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                {
                    reviews && reviews.map((review, idx) => (
                        <div className='p-3 rounded-md border shadow-sm border-gray-50 md:flex gap-3'>
                            <div className='border rounded-md'><img className='md:w-64 w-full h-80 md:h-full object-cover rounded-md' src={review.userImage} alt="" /></div>
                            <div className='space-y-2'>
                                <h2 className='text-lg font-semibold'>{review.userName}</h2>
                                <p><span className='text-base font-semibold'>Rating : </span><span>{review.rating}</span></p>
                                <p>{review.feedback}</p>
                                <p className='font-semibold'>{moment(review.reviewGivingDate).format('DD-MM-YYYY')}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MyReviews;