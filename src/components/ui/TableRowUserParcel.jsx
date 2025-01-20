import React, { useState } from 'react';
import { TableCell, TableRow } from './table';
import moment from 'moment';
import { Button } from './button';
import { Badge } from './badge';
import { Link } from 'react-router-dom';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Label } from './label';
import { Select } from './select';
import { Input } from './input';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import useAuth from '@/Hooks/useAuth';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuShortcut,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { FaRegUser } from 'react-icons/fa6';
// import { MdOutlineDashboard } from 'react-icons/md';
// import { IoLogOutOutline } from 'react-icons/io5';

const TableRowUserParcel = ({ idx, parcel, handleCancelParcel }) => {
    const { parcelType, userName, requestedDeliveryDate, approximateDeliveryDate, bookingDate, deliveryMenId, status, _id } = parcel
    const {user} = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const openDialog = () => setIsOpen(true)
    const closeDialog = () => setIsOpen(false)

    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm()
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        if (new Date(data.approximateDeliveryDate) < new Date()) {
            return toast.error('give a future date')
        }
        if (new Date(data.approximateDeliveryDate) > new Date(requestedDeliveryDate)) {
            return toast.error('give a date inside the requested deliveryDate')
        }

        console.log(data)
        try {
            const assigned = {
                deliveryMenId: data.deliveryMen,
                approximateDeliveryDate: data.approximateDeliveryDate
            }
            const res = await axiosSecure.patch(`/parcel/assignDelivery/${_id}`, assigned)
            if (res.data.modifiedCount) {
                toast.success('Delivery assigned successfully')
                refetch()
                closeDialog()
            }
        } catch (err) {
            toast.error(err.response?.message || 'Failed to assign delivery')
        }

    }
    return (
        <TableRow className="" key={idx}>
            <TableCell className="whitespace-nowrap">{parcelType}</TableCell>
            <TableCell className="whitespace-nowrap">{moment(requestedDeliveryDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap text-center">{approximateDeliveryDate === 'Not assigned' ? <p className={`text-center text-yellow-500 bg-yellow-50 py-1 rounded-2xl`}>{approximateDeliveryDate}</p> : moment(approximateDeliveryDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap">{moment(bookingDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell className="whitespace-nowrap">{deliveryMenId === 'Not assigned' ? <Badge className={`text-center bg-yellow-50 text-yellow-500 py-1 rounded-2xl`}>{deliveryMenId}</Badge> : deliveryMenId}</TableCell>
            <TableCell className="whitespace-nowrap">
                <p className={`text-center ${status === 'cancelled' && 'text-slate-500 bg-red-50'} ${status === 'pending' && 'text-yellow-500 bg-yellow-50'} ${status === 'on the way' && 'text-pink-500 bg-pink-50'} ${status === 'delivered' && 'text-green-500 bg-green-50'} py-1 rounded-2xl`}>{status}</p>
            </TableCell>
            <TableCell className="space-x-2 py-1 whitespace-nowrap">
                {status !== 'pending' ? <button disabled className="px-2  text-center py-1 rounded-sm bg-slate-300 ">Update</button> :
                    <button className="px-2  text-center py-1 rounded-sm text-white bg-yellow-500"><Link to={`/dashboard/updateParcel/${_id}`}>Update</Link></button>
                }
                <button onClick={() => handleCancelParcel(_id)} disabled={status !== 'pending'} className={`px-2  text-center py-1 rounded-sm text-white bg-red-500`}>Cancel</button>
                {status === 'delivered' &&

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <button onClick={openDialog} className="px-2 py-1 rounded-sm bg-green-500 text-white">Review</button>
                        <DialogContent className="sm:max-w-[350px] p-4">
                            <DialogHeader>
                                <DialogTitle className="text-xl">Give review</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 pt-1">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* select */}
                                    <div className='w-full mb-2'>
                                        <Label className="pb-3">User Name</Label>
                                        <Input type="text" defaultValue={user?.displayName} readOnly
                                            {...register('reviewGiversName', {
                                                required: 'userName  is required'
                                            })}
                                            name="reviewGiversName" id="" />
                                        {errors.reviewGiversName && <p className='text-red-500 text-xs'>{errors.reviewGiversName.message}</p>}

                                    </div>
                                    {/* delivery date */}
                                    <div className="w-full mb-3">
                                        <Label htmlFor="image">User Image</Label>
                                        <Input defaultValue={user?.photoURL} readOnly type="url"
                                            {...register('reviewGiversImage', {
                                                required: 'user image  is required'
                                            })}
                                            name="reviewGiversImage" id="" />


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
                }
                {status !== 'pending' ? <button disabled className="px-4 text-center bg-slate-300 py-1 rounded-sm">Pay</button> :
                    <button className="px-4 text-center py-1 rounded-sm text-white bg-red-300"><Link to={`/dashboard/checkout/${_id}`}>Pay</Link></button>
                }
            </TableCell>
        </TableRow>
    );
};

export default TableRowUserParcel;