import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa6";

const BookParcel = () => {
    const { handleSubmit, register, setValue, reset, watch, formState: { errors } } = useForm()
    // const axiosSecure = useAxiosSecure()
    const [date, setDate] = useState(null)
    const [price, setPrice] = useState(0)
    const weight = watch("weight")

    useEffect(() => {
        if (weight !== undefined && weight !== null) {

            let calculatedPrice = 0
            if (weight <= 0) {
                calculatedPrice = 0
            }
            else if (weight <= 1) {
                calculatedPrice = 50
            }
            else if (weight <= 2) {
                calculatedPrice = 100
            }
            else if (weight > 2) {
                calculatedPrice = 150
            }
            setPrice(calculatedPrice)
            setValue("price", calculatedPrice)
        }
    }, [weight, setValue])

    const onSubmit = async (data) => {
        console.log(data)
    }
    return (
        <div className="py-2 md:py-12 lg:py-20 w-10/12 md:w-9/12 mx-auto">
            {/* text-content */}
            <h3 className="text-4xl text-center font-bold">Book a Parcel</h3>
            <div className="mt-5">
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                    {/* row-1 */}
                    <div className='md:flex items-center gap-3 mb-3'>
                        {/* name field */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" {...register('userName', { required: 'Name is required' })} id="name" placeholder="Enter your Name" />
                            {errors.userName && <p className='text-red-500 text-xs'>{errors.userName.message}</p>}
                        </div>
                        {/* email field */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email"
                                {...register('email', { required: 'Please enter a valid email address' })}
                                id="email"
                                placeholder="Enter your Email" />
                            {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}

                        </div>
                    </div>
                    {/* row-2 */}
                    <div className='md:flex items-center gap-3 mb-2'>
                        {/* phone field */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="phone">Phone</Label>
                            <Input type="number" {...register('userPhone', {
                                required: 'Phone no is required',
                                pattern: {
                                    value: /^(?:\+8801|01)[3-9]\d{8}$/,
                                    message: 'Phone number is not valid'
                                }
                            })} id="phone" placeholder="Enter your Phone number" />
                            {errors.userPhone && <p className='text-red-500 text-xs'>{errors.userPhone.message}</p>}
                        </div>
                        {/* parcel type */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="parcelType">Parcel Type</Label>
                            <Input type="text" {...register('parcelType', { required: 'Parcel type is required' })} id="parcelType" placeholder="Enter parcel type" />
                            {errors.parcelType && <p className='text-red-500 text-xs'>{errors.parcelType.message}</p>}
                        </div>

                    </div>
                    {/* row-3 */}
                    <div className='md:flex items-center gap-3 mb-2'>
                        {/* weight */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="weight">Weight</Label>
                            <Input type="number"
                                {...register("weight",
                                    {
                                        required: 'weight is required',
                                    })}
                                id="weight"
                                placeholder="Enter parcel weight" />
                            {errors.weight && <p className='text-red-500 text-xs'>{errors.weight.message}</p>}
                        </div>
                        {/* reciever name */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="receiversName">Receiver Name</Label>
                            <Input type="text"
                                {...register('receiverName',
                                    {
                                        required: 'Receiver Name is required',
                                    })}
                                id="receiver"
                                placeholder="Enter receiver name" />
                            {errors.receiverName && <p className='text-red-500 text-xs'>{errors.receiverName.message}</p>}
                        </div>
                    </div>
                    {/* row-4 */}
                    <div className='md:flex items-center gap-3 mb-2'>
                        {/* receiver phone */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="phone">Receiver Phone</Label>
                            <Input type="number" {...register('receiverPhone', {
                                required: 'Receiver Phone no is required',
                                pattern: {
                                    value: /^(?:\+8801|01)[3-9]\d{8}$/,
                                    message: 'Phone number is not valid'
                                }
                            })} id="phone" placeholder="Enter receiver Phone number" />
                            {errors.receiverPhone && <p className='text-red-500 text-xs'>{errors.receiverPhone.message}</p>}
                        </div>
                        {/* Delivery address */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="address">Delivery address</Label>
                            <Input type="text"
                                {...register('deliveryAddress',
                                    {
                                        required: 'Parcel Delivery address is required',
                                    })}
                                id="address"
                                placeholder="Enter Parcel Delivery address" />
                            {errors.receiverName && <p className='text-red-500 text-xs'>{errors.receiverName.message}</p>}
                        </div>

                    </div>
                    {/* row-5 */}
                    <div className='md:flex items-start gap-3 mb-2'>
                        {/* delivery date */}
                        <div className="w-full mb-2 md:mb-0">
                            <Label htmlFor="address">Delivery date</Label>
                            <Input type="date"
                                {...register('deliveryDate', {
                                    required: 'deliveryDate  is required',
                                })}
                                name="deliveryDate" id="" />
                            {errors.receiverName && <p className='text-red-500 text-xs'>{errors.receiverName.message}</p>}


                        </div>
                        {/* address latitude */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="latitude">Delivery Address Latitude</Label>
                            <Input type="number" {...register('latitude', {
                                required: 'Delivery address latitude is required',
                                pattern: {
                                    value: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
                                    message: 'invalid Latitude'
                                }
                            })} id="latitude" placeholder="Enter Delivery address latitude" />
                            {errors.latitude && <p className='text-red-500 text-xs'>{errors.latitude.message}</p>}
                        </div>
                    </div>
                    {/* row-6 */}
                    <div className='md:flex items-start gap-3 mb-2'>
                        {/* delivery address longitude */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="longitude">Delivery Address Longitude</Label>
                            <Input type="number" {...register('longitude', {
                                required: 'Delivery address longitude is required',
                                pattern: {
                                    value: /^[-+]?((1[0-7]\d|\d{1,2})(\.\d+)?|180(\.0+)?)$/,
                                    message: 'invalid Longitude'
                                }
                            })} id="longitude" placeholder="Enter Delivery address Longitude" />
                            {errors.longitude && <p className='text-red-500 text-xs'>{errors.longitude.message}</p>}
                        </div>
                        {/* price field */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="price">Price</Label>
                            <Input value={price} type="number"
                                {...register("price", {
                                    required: 'Price is required',
                                })}
                                id="price" />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-red-700">Book</Button>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;