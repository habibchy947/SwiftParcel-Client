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
import { Textarea } from './textarea';
import toast from 'react-hot-toast';
import Rating from 'react-rating';
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md';


const TableRowUserParcel = ({ idx, parcel, handleCancelParcel }) => {
    const { parcelType, userName, requestedDeliveryDate, approximateDeliveryDate, bookingDate, deliveryMenId, status, _id } = parcel
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const openDialog = () => setIsOpen(true)
    const closeDialog = () => setIsOpen(false)
    const [active, setIsActive] = useState(false)
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const axiosSecure = useAxiosSecure()
    const [rating, setRatng] = useState(0)

    const handleRatingChange = (value) => {
        setRatng(value)
    }

    const onSubmit = async (data) => {
        if (data.rating > 6 ) {
            return toast.error('rate out of five')
        }
        if(rating <= 0 ) {
            return toast.error('Rate this delivery men')
        }
        // console.log(data)
        try {
            const review = {
                userName: user?.displayName,
                userImage: user?.photoURL,
                rating: parseFloat(rating),
                deliveryMenId: deliveryMenId,
                feedback: data.feedback,
                reviewGivingDate: new Date()
            }
            // console.table(review)
            const res = await axiosSecure.post(`/review`, review)
            // console.log(res.data)
            if (res.data.insertedId) {
                toast.success('Review submitted successfully')
                reset()
                setIsActive(true)
                closeDialog()
            }
        } catch (err) {
            toast.error(err.response?.message || 'Failed to give rating')
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
                {status === 'pending' && <button className="px-2  text-center py-1 rounded-sm text-white bg-yellow-500"><Link to={`/dashboard/updateParcel/${_id}`}>Update</Link></button>
                }
                {
                    status === 'pending' && <button onClick={() => handleCancelParcel(_id)} disabled={status !== 'pending'} className={`px-2  text-center py-1 rounded-sm text-white bg-red-500`}>Cancel</button>
                }
                {status === 'delivered' && 

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <button onClick={openDialog} disabled={active} className={`px-2 py-1 rounded-sm bg-green-500 text-white`}>Review</button>
                        <DialogContent className="sm:max-w-[350px] p-4">
                            <DialogHeader>
                                <DialogTitle className="text-xl">Give review</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* user name */}
                                    <div className='w-full mb-2'>
                                        <Label className="pb-3">User Name</Label>
                                        <Input type="text" defaultValue={user?.displayName} readOnly
                                            {...register('reviewGiversName', {
                                                required: 'userName  is required'
                                            })}
                                            name="reviewGiversName" id="" />
                                        {errors.reviewGiversName && <p className='text-red-500 text-xs'>{errors.reviewGiversName.message}</p>}

                                    </div>
                                    {/* user image  */}
                                    <div className="w-full mb-3">
                                        <Label htmlFor="image">User Image</Label>
                                        <Input defaultValue={user?.photoURL} readOnly type="url"
                                            {...register('reviewGiversImage', {
                                                required: 'user image  is required'
                                            })}
                                            name="reviewGiversImage" id="" />
                                        {errors.reviewGiversImage && <p className='text-red-500 text-xs'>{errors.reviewGiversImage.message}</p>}


                                    </div>
                                    {/* rating  */}
                                    <div className="w-full mb-3 flex flex-col">
                                        <Label htmlFor="rate" className="mb-2">Rate Delivery Men</Label>
                                        <Rating
                                        className='text-2xl'
                                        required
                                        initialRating={rating}
                                        emptySymbol={<MdOutlineStarOutline/>}
                                        fullSymbol={<MdOutlineStarPurple500 className='text-yellow-400'/>}
                                        onChange={handleRatingChange}
                                        fractions={2}
                                        >

                                        </Rating>
                                        {errors.rating && <p className='text-red-500 text-xs'>{errors.rating.message}</p>}


                                    </div>
                                    {/* deliveryMen id */}
                                    <div className="w-full mb-3">
                                        <Label htmlFor="id">Delivery Men ID</Label>
                                        <Input defaultValue={deliveryMenId} type="text" readOnly
                                            {...register('deliveryMenId', {
                                                required: 'deliveryMenId  is required'
                                            })}
                                            name="deliveryMenId" id="" placeholder="rate about delivery" />
                                        {errors.deliveryMenId && <p className='text-red-500 text-xs'>{errors.deliveryMenId.message}</p>}


                                    </div>
                                    {/* feedback */}
                                    <div className="w-full mb-3">
                                        <Label htmlFor="feedback">Feedback</Label>
                                        <Textarea placeholder="Type your message here."
                                            {...register('feedback', {
                                                required: 'feedback  is required'
                                            })}
                                        />
                                        {errors.feedback && <p className='text-red-500 text-xs'>{errors.feedback.message}</p>}


                                    </div>
                                    <div className="flex gap-3 justify-start">
                                        <Button type="submit" className="bg-green-400">Submit</Button>
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