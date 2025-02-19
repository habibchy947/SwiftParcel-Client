import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import profileBg from '../../assets/dashboard/profile-cover.jpg'
import { TfiEmail } from "react-icons/tfi";
import { FaPhone } from "react-icons/fa6";
import { MdMergeType } from "react-icons/md";
import { uploadImage } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import Loading from '@/components/ui/Loading';
import { Helmet } from 'react-helmet-async';

const MyProfile = () => {
    const { user, updateUserProfile } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: userProfile = {}, isLoading, refetch } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`https://swift-parcel-server-eta.vercel.app/user/${user?.email}`)
            return data
        }
    })
    // console.log(userProfile)
    const { handleSubmit, register, reset, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            const imageFile = data.photoFile[0]
            const photo = await uploadImage(imageFile)
            await updateUserProfile(userProfile.name, photo)

            const res = await axiosSecure.patch(`/user/${user?.email}`, { image: photo })
            if (res.data.modifiedCount) {
                // console.log('picture updated successfully')
                reset()
                refetch()
                toast.success('Picture uploaded successfully')
            } else {
                toast.error('failed to upload')
            }
        } catch (err) {
            toast.error(err)
        }


    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='border rounded-md '>
            <Helmet>
                <title>SwiftParcel | Profile</title>
            </Helmet>
            <div className=" mx-auto p-5  rounded-xl shadow-xl">
                <div className="flex items-center space-x-6">
                    <img
                        src={userProfile.image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-red-500"
                    />
                    <div>
                        <h1 className="text-4xl font-semibold dark:text-white text-gray-800">{userProfile.name}</h1>
                        <p className="text-lg text-gray-600 dark:text-white">{userProfile.userType}</p>
                        <p className="text-md text-gray-500 dark:text-gray-300 mt-2">Located in Bangladesh</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold dark:text-gray-200 text-gray-800">Contact Information</h2>
                    <ul className="mt-4 space-y-4">
                        <li className="flex items-center dark:text-gray-300 text-gray-600">
                            <span className="font-semibold dark:text-gray-300 text-gray-800 w-28">Email:</span>
                            <a href={`mailto:${userProfile.email}`} className="text-blue-500 hover:underline">
                                {userProfile.email}
                            </a>
                        </li>
                        <li className="flex items-center text-gray-600">
                            <span className="font-semibold dark:text-gray-300 text-gray-800 w-28">Phone:</span>
                            <span className="text-gray-700 dark:text-gray-400">{userProfile.phone}</span>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto pt-5">
                    <div className='md:w-4/12 w-8/12 space-y-2 md:space-y-2 mb-3'>

                        <div className="w-full flex items-center gap-1.5">
                            <input name='image' placeholder='Upload' id="fileInput" hidden
                                {...register('photoFile', { required: 'Please upload a photo' })}
                                type="file" accept='image/*' />
                            <label htmlFor="fileInput" className='bg-red-300 py-2 px-2 rounded-md text-center text-white font-semibold w-full'>Upload Profile Picture</label>
                        </div>
                        <Button type="submit" className="w-full dark:text-white bg-red-700">Update</Button>
                    </div>
                    {errors.photoFile && <p className='text-red-500 dark:text-white text-xs'>{errors.photoFile.message}</p>}
                </form>
            </div>
        </div>
    );
};

export default MyProfile;