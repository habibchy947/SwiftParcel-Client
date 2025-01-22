import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "@/Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/ui/DashboardHeader";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const BookParcel = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const { handleSubmit, register, setValue, reset, watch, formState: { errors } } = useForm()
    const axiosSecure = useAxiosSecure()
    const [price, setPrice] = useState(0)
    const weight = watch("weight")

    const { data: users = {}, isLoading, refetch } = useQuery({
        queryKey: ['usersS', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`https://swift-parcel-server-eta.vercel.app/user/${user?.email}`)
            return data
        }
    })
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
        const parcel = {
            userName: user.displayName,
            email: user.email,
            userId: users._id,
            phone: data.userPhone,
            parcelType: data.parcelType,
            weight: parseFloat(data.weight),
            receiverName: data.receiverName,
            receiverPhone: data.receiverPhone,
            deliveryAddress: data.deliveryAddress,
            requestedDeliveryDate: data.deliveryDate,
            approximateDeliveryDate: 'Not assigned',
            deliveryMenId: 'Not assigned',
            bookingDate: new Date(),
            latitude: data.latitude,
            longitude: data.longitude,
            price: parseFloat(data.price),
            status: 'pending'
        }
        // console.table(parcel)

        try {
            const res = await axiosSecure.post('/parcel', parcel)
            if (res.data.insertedId) {
                toast.success('Your Parcel booked successfully')
                // console.log(res.data)
                setPrice(0)
                reset()
                navigate('/dashboard/myParcel')
            }
        }
        catch (err) {
            toast.error('Invalid data')
        }


    }
    return (
        <div className="py-2 md:py-5 w-10/12 md:w-9/12 mx-auto">
            <Helmet>
                <title>SwiftParcel | Book Parcel</title>
            </Helmet>
            {/* text-content */}
            <DashboardHeader title='Book Parcel'></DashboardHeader>
            <div className="mt-5">
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                    {/* row-1 */}
                    <div className='md:flex items-center gap-3 mb-3'>
                        {/* name field */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="name">Name</Label>
                            <Input defaultValue={user?.displayName} readOnly type="text" {...register('userName', { required: 'Name is required' })} id="name" placeholder="Enter your Name" />
                            {errors.userName && <p className='text-red-500 text-xs'>{errors.userName.message}</p>}
                        </div>
                        {/* email field */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="email">Email</Label>
                            <Input defaultValue={user?.email} readOnly type="email"
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
                                        pattern: {
                                            value: /^(?!0(\.0+)?$)\d+(\.\d+)?$/,
                                            message: 'Weight cannot be zero'
                                        }
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
                            <Label htmlFor="date">Requested Delivery date</Label>
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
                            <Input type="text" {...register('latitude', {
                                required: 'Delivery address latitude is required',

                            })} id="latitude" placeholder="Enter Delivery address latitude" />
                            {errors.latitude && <p className='text-red-500 text-xs'>{errors.latitude.message}</p>}
                        </div>
                    </div>
                    {/* row-6 */}
                    <div className='md:flex items-start gap-3 mb-2'>
                        {/* delivery address longitude */}
                        <div className='w-full mb-2 md:mb-0'>
                            <Label htmlFor="longitude">Delivery Address Longitude</Label>
                            <Input type="text" {...register('longitude', {
                                required: 'Delivery address longitude is required',

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