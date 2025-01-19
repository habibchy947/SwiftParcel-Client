import DashboardHeader from '@/components/ui/DashboardHeader';
import Header from '@/components/ui/Header';
import { Label } from '@/components/ui/label';
import Loading from '@/components/ui/Loading';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TableRowUserParcel from '@/components/ui/TableRowUserParcel';
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const MyParcel = () => {
    const [filter, setFilter] = useState('')
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [], refetch,isLoading } = useQuery({
        queryKey: ['myParcel', user?.email, filter],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/myParcel/${user?.email}?filter=${filter}`)
            return data
        }
    })
    console.log(filter)

    // parcel cancellation
    const handleCancelParcel = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Continue"
        }).then( async(result) => {
            if (result.isConfirmed) {
               axiosSecure.patch(`/parcel/returned/${id}`)
               .then(res => {
                   if (res.data.modifiedCount) {
                       Swal.fire({
                           title: "Cancelled!",
                           text: "Your parcel has been cancelled.",
                           icon: "success"
                       });
                       refetch()
                   }
               })
               
            }
        });
    }
    return (
        <div className='py-2 md:py-5'>
            <DashboardHeader title='My Parcel'></DashboardHeader>
            <div className='w-52'>
                <Select id="userType"
                    onValueChange={(value) => setFilter(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="on the way">On the way</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="returned">Returned</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {isLoading && <Loading/>}
            <div className='rounded-md border mt-2 overflow-x-auto'>
                <Table className="w-full table-auto">
                    <TableHeader className='bg-slate-50'>
                        <TableRow className="font-medium text-md">
                            <TableHead className="whitespace-nowrap">Parcel Type</TableHead>
                            <TableHead className="whitespace-nowrap">Req. Delivery Date</TableHead>
                            <TableHead className="whitespace-nowrap">Approx. Delivery Date</TableHead>
                            <TableHead className="whitespace-nowrap">Booking Date</TableHead>
                            <TableHead className="whitespace-nowrap">Delivery men ID</TableHead>
                            <TableHead className="whitespace-nowrap">Booking status</TableHead>
                            <TableHead className="whitespace-nowrap">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            parcels.map((parcel, idx) => <TableRowUserParcel handleCancelParcel={handleCancelParcel} key={idx} parcel={parcel}></TableRowUserParcel>)
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MyParcel;