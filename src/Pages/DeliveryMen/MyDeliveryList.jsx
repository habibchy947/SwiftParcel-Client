import DashboardHeader from '@/components/ui/DashboardHeader';
import Loading from '@/components/ui/Loading';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TableRowDeliveryList from '@/components/ui/TableRowDeliveryList';
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';

const MyDeliveryList = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: deliveryMen = {}, isLoading } = useQuery({
        queryKey: ['deliveryMen', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/deliveryMen/${user?.email}`)
            return res.data
        }
    })
    const { data: myDeliveryList = [], isLoading: isDeliveryLisLoading, refetch } = useQuery({
        queryKey: ['deliveryList', deliveryMen._id],
        queryFn: async () => {
            if (deliveryMen._id) {
                const res = await axiosSecure.get(`/deliveryList/${deliveryMen._id}`)
                return res.data
            }
            return []
        }
    })
    console.log(myDeliveryList)

    const handleChangeParcelStatus = (bookedId, status, titleLabel, textLabel) => {
        console.log(bookedId, status)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continue"
        }).then(async (result) => {
            if (result.isConfirmed) {
                 axiosSecure.patch(`/parcel/parcelStatus/${bookedId}`, { status })
                    .then(res => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: titleLabel,
                                text: textLabel,
                                icon: "success"
                            });
                            refetch()
                        }
                    })

            }
        });
    }

    if (isLoading || isDeliveryLisLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <DashboardHeader title={`My Delivery List (${myDeliveryList.length})`}></DashboardHeader>
            <div className='rounded-md border mt-2 overflow-x-auto'>
                <Table className="w-full table-auto">
                    <TableHeader className='bg-slate-50'>
                        <TableRow className="font-medium text-md">
                            <TableHead className="whitespace-nowrap">Booked User Name</TableHead>
                            <TableHead className="whitespace-nowrap">Reciever Name</TableHead>
                            <TableHead className="whitespace-nowrap">Booked User Phone</TableHead>
                            <TableHead className="whitespace-nowrap">Req. Delivery Date</TableHead>
                            <TableHead className="whitespace-nowrap">Approx. Delivery Date</TableHead>
                            <TableHead className="whitespace-nowrap">Reciever Phone</TableHead>
                            <TableHead className="whitespace-nowrap">Reciever Address</TableHead>
                            <TableHead className="whitespace-nowrap">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            myDeliveryList.map((deliveryList, idx) => <TableRowDeliveryList key={idx} deliveryList={deliveryList} handleChangeParcelStatus={handleChangeParcelStatus} refetch={refetch}></TableRowDeliveryList>)
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MyDeliveryList;