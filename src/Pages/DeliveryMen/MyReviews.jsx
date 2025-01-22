import DashboardHeader from '@/components/ui/DashboardHeader';
import Loading from '@/components/ui/Loading';
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md';
import Rating from 'react-rating';

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
    // console.log(deliveryMen._id)
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
    // console.log(reviews)
    if (isLoading || isDeliveryLisLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Helmet>
                <title>SwiftParcel | My Reviews</title>
            </Helmet>
            <DashboardHeader title={'My Reviews'}></DashboardHeader>
            {!reviews ?
                <h2 className='text-2xl font-semibold text-destructive'>No reviews available</h2>
                :
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2'>
                    {
                        reviews && reviews.map((review, idx) => (
                            <div className='p-3 rounded-md border shadow-sm border-gray-100 md:flex gap-3'>
                                <div className='border rounded-md'><img className='md:w-72 w-full h-80 md:h-full object-cover rounded-md' src={review.userImage} alt="" /></div>
                                <div className='space-y-2'>
                                    <h2 className='text-lg font-semibold'>{review.userName}</h2>
                                    <p className='flex gap-1 items-center'>
                                        <Rating
                                            className='text-lg'
                                            initialRating={review.rating}
                                            emptySymbol={<MdOutlineStarOutline />}
                                            fullSymbol={<MdOutlineStarPurple500 className='text-yellow-400' />}
                                            fractions={2}
                                        />
                                        <span>{review.rating}</span>
                                    </p>
                                    <p>{review.feedback}</p>
                                    <p className='font-semibold'>{moment(review.reviewGivingDate).format('DD-MM-YYYY')}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default MyReviews;