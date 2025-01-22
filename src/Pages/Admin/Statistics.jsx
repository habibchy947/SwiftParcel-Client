
import DashboardHeader from '@/components/ui/DashboardHeader';
import Loading from '@/components/ui/Loading';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Helmet } from 'react-helmet-async';

const Statistics = () => {
    const axiosSecure = useAxiosSecure()
    const { data = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/adminStats')
            return res.data
        }
    })
    // console.log(data)
    if (isLoading) {
        return <Loading></Loading>
    }

    const optiosForBar = {
        chart: { type: 'bar' },
        xaxis: { categories: data.bookingsByDate.dates },
        title: { text: 'Bookings By Date' }
    }

    const seriesForBar = [{
        name: 'Bookings',
        data: data.bookingsByDate.counts
    }]

    const optiosForLine = {
        chart: { type: 'line' },
        xaxis: { categories: data.bookingVsDelivered.dates },
        title: { text: 'Comparison of Booked and delivered parcels' }
    }

    const seriesForLine = [{
        name: 'Bookings',
        data: data.bookingVsDelivered.booked
    },
    {
        name: 'Delivered',
        data: data.bookingVsDelivered.delivered
    },]
    return (
        <div>
            <Helmet>
                <title>SwiftParcel | Statistics</title>
            </Helmet>
            <DashboardHeader title={'Statistics'}></DashboardHeader>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-10'>
                <ReactApexChart options={optiosForBar} series={seriesForBar} type='bar'></ReactApexChart>
                <ReactApexChart options={optiosForLine} series={seriesForLine} type='line'></ReactApexChart>

            </div>

        </div>
    );
};

export default Statistics;