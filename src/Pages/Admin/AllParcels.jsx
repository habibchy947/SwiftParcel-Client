import DashboardHeader from '@/components/ui/DashboardHeader';
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useRole from '@/Hooks/useRole';
import Loading from '@/components/ui/Loading';
import TableRowAllParcel from '@/components/ui/TableRowAllParcel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AllParcels = () => {
    const [role, isLoading] = useRole()
    const axiosSecure = useAxiosSecure()
    const [startDateReal, setStartDateReal] = useState('')
    const [endDateReal, setEndDateReal] = useState('')

    const { data: allParcels = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['allParcel',startDateReal, endDateReal],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allParcels?dateFrom=${startDateReal}&dateTo=${endDateReal}`)
            return data
        }
    })
    const { data: allDeliveryMen = [] } = useQuery({
        queryKey: ['allDeliveryMen'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/allDeliveryMen`)
            return data
        }
    })

    console.log(allParcels)
    console.log(allDeliveryMen)

    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm()
    const onSubmit = async (data) => {
        const startDate = new Date(data.dateFrom)
        const endDate = new Date(data.dateTo)
        if (startDate < new Date()) {
            return toast.error('give a future date')
        }
        if (endDate < new Date()) {
            return toast.error('give a future date')
        }
        if(startDate > endDate){
            return toast.error("start date can't be greater than end date")
        }
        console.log(data)
        setStartDateReal(data.dateFrom)
        setEndDateReal(data.dateTo)
        reset()
        refetch()
    }

    if (isLoading || loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <DashboardHeader title='All Parcels'></DashboardHeader>
            <div className='w-52'>
                <h2 className='mb-2 font-semibold'>Select Date Range</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-2'>
                        <Input type="date"
                            {...register('dateFrom', {
                                required: 'dateFrom  is required'
                            })}
                            onValueChange={(value) => setValue('dateFrom', value)}
                            name="dateFrom" id="" />

                        <Input type="date"
                            {...register('dateTo', {
                                required: 'dateTo  is required'
                            })}
                            onValueChange={(value) => setValue('dateTo', value)}
                            name="dateTo" id="" />
                        <Button type='submit' className='bg-red-300'>Search</Button>
                    </div>
                </form>
            </div>
            <div className='rounded-md border mt-2 overflow-x-auto'>
                <Table className="w-full table-auto">
                    <TableHeader className='bg-slate-50'>
                        <TableRow className="font-medium text-md">
                            <TableHead className="whitespace-nowrap">User Name</TableHead>
                            <TableHead className="whitespace-nowrap">User Phone</TableHead>
                            <TableHead className="whitespace-nowrap">Booking Date</TableHead>
                            <TableHead className="whitespace-nowrap">Requested Delivery Date</TableHead>
                            <TableHead className="whitespace-nowrap">Cost</TableHead>
                            <TableHead className="whitespace-nowrap">Status</TableHead>
                            <TableHead className="whitespace-nowrap">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            allParcels.map((parcel, idx) => <TableRowAllParcel key={idx} parcel={parcel} refetch={refetch} allDeliveryMen={allDeliveryMen}></TableRowAllParcel>)
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AllParcels;