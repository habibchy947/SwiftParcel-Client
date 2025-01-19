import React, { useState } from 'react';
import { TableCell, TableRow } from './table';
import moment from 'moment';
import { Button } from './button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Label } from './label';
import { Input } from './input';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select';
import toast from 'react-hot-toast';
import useAxiosSecure from '@/Hooks/useAxiosSecure';

const TableRowAllParcel = ({ parcel ,refetch, allDeliveryMen}) => {
    const { userName, phone, requestedDeliveryDate, price, bookingDate, status, _id } = parcel || {}
    const [isOpen, setIsOpen] = useState(false)
    const openDialog = () => setIsOpen(true)
    const closeDialog = () => setIsOpen(false)
    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm()
    const axiosSecure = useAxiosSecure()
    const onSubmit = async (data) => {
        if(new Date(data.deliveryDate) < new Date()){
            return toast.error('give a future date')
        }
        console.log(data)
        try{
            const assigned = {
                deliveryMenId: data.deliveryMen,
                approximateDeliveryDate: data.approximateDeliveryDate
            }
            const res = await axiosSecure.patch(`/parcel/assignDelivery/${_id}`, assigned)
            if(res.data.modifiedCount){
                toast.success('Delivery assigned successfully')
                refetch()
                closeDialog()
            }
        }catch(err){
            toast.error(err.response?.message || 'Failed to assign delivery')
        }
        
    }

    return (
        <TableRow className="">
            <TableCell className="whitespace-nowrap">{userName}</TableCell>
            <TableCell className="whitespace-nowrap">{phone}</TableCell>
            <TableCell className="whitespace-nowrap">{moment(bookingDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap">{moment(requestedDeliveryDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap">{price}</TableCell>
            <TableCell className="whitespace-nowrap">
                <p className={`text-center ${status === 'cancelled' && 'text-slate-500 bg-slate-50'} ${status === 'pending' && 'text-yellow-500 bg-yellow-50'} ${status === 'on the way' && 'text-pink-500 bg-pink-50'} ${status === 'delivered' && 'text-green-500 bg-green-50'} py-1 px-1 rounded-2xl`}>{status}</p>
            </TableCell>
            <TableCell>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <Button disabled={status !== 'pending'} onClick={openDialog} className={`${status !== 'pending' ? 'bg-slate-300 text-gray-800': 'bg-green-50 text-green-500'} `}>Manage</Button>
                    <DialogContent className="sm:max-w-[350px]">
                        <DialogHeader>
                            <DialogTitle>Manage Parcel</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 pt-1">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* select */}
                                <div className='w-full mb-2'>
                                    <Label className="">Delivery Men</Label>
                                    <Select id="deliveryMen" className="mt-2"
                                    {...register('deliveryMen', { required: 'Assign a delivery men' })}
                                    onValueChange={(value) => setValue('deliveryMen', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="select delivery men" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    allDeliveryMen ? allDeliveryMen.map((alldeliMen, index)=> (
                                                        <SelectItem key={index} value={alldeliMen._id}>{alldeliMen.name}</SelectItem>
                                                    ))
                                                    : <SelectItem value="nodeliverymen">Make an user to delivery men</SelectItem>
                                                }
                                                
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.deliveryMen && <p className='text-red-500 text-xs'>{errors.deliveryMen.message}</p>}
                                </div>
                                {/* delivery date */}
                                <div className="w-full mb-3">
                                    <Label htmlFor="date">Approximate Delivery date</Label>
                                    <Input type="date"
                                        {...register('approximateDeliveryDate', {
                                            required: 'approximateDeliveryDate  is required'
                                        })}
                                        onValueChange={(value) => setValue('approximateDeliveryDate', value)}
                                        name="approximateDeliveryDate" id="" />
                                    {errors.approximateDeliveryDate && <p className='text-red-500 text-xs'>{errors.approximateDeliveryDate.message}</p>}


                                </div>
                                <div className="flex gap-3 justify-start">
                                    <Button type="submit" className="bg-green-400">Assign</Button>
                                    <DialogClose asChild>
                                        <Button type="button" variant="destructive">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
};

export default TableRowAllParcel;