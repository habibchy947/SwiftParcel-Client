import DashboardHeader from '@/components/ui/DashboardHeader';
import Loading from '@/components/ui/Loading';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TableRowAllDeliveryMen from '@/components/ui/TableRowAllDeliveryMen';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const AllDeliveryMen = () => {
    const axiosSecure = useAxiosSecure()
    const { data: allDeliveryMen = [], refetch } = useQuery({
        queryKey: ['allDeliverMen'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allDeliveryMen`)
            return data
        }
    })

    const axiosPublic = useAxiosPublic()
    const { data: deliveryMens = [], isLoading } = useQuery({
        queryKey: ['top-delivery-men'],
        queryFn: async () => {
            const res = await axiosPublic.get('/top-delivery-men')
            return res.data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Helmet>
                <title>SwiftParcel | All Delivery Men</title>
            </Helmet>
            <DashboardHeader title='All Delivery Men'></DashboardHeader>
            <div className='rounded-md border mt-2 overflow-x-auto'>
                <Table className="w-full table-auto">
                    <TableHeader className='bg-slate-50'>
                        <TableRow className="font-medium text-md">
                            <TableHead className="whitespace-nowrap">Name</TableHead>
                            <TableHead className="whitespace-nowrap">Phone</TableHead>
                            <TableHead className="whitespace-nowrap">Parcels Delivered</TableHead>
                            <TableHead className="whitespace-nowrap">Average Review</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            allDeliveryMen.map((deliveryMen, idx) => <TableRowAllDeliveryMen key={idx} deliveryMen={deliveryMen} refetch={refetch}></TableRowAllDeliveryMen>)
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AllDeliveryMen;