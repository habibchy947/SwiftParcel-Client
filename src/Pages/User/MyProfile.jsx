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

const MyProfile = () => {
    const { user, updateUserProfile } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: userProfile = {}, isLoading, refetch } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`http://localhost:5000/user/${user?.email}`)
            return data
        }
    })
    console.log(userProfile)
    const { handleSubmit, register, reset, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try{
            const imageFile = data.photoFile[0]
            const photo = await uploadImage(imageFile)
            await updateUserProfile(userProfile.name, photo)

            const res = await  axiosSecure.patch(`/user/${user?.email}`, {image:photo})
                if (res.data.modifiedCount) {
                    console.log('picture updated successfully')
                    reset()
                    refetch()
                    toast.success('Picture uploaded successfully')
                }else{
                    toast.error('failed to upload')
                }
        } catch (err) {
            toast.error(err)
        }
        

    }

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='w-11/12 md:w-6/12 mx-auto border rounded-md'>
            <div
                style={{
                    backgroundImage: `url(${profileBg})`,
                }}
                className='bg-cover relative bg-no-repeat bg-center py-20 lg:py-28'
            >

                <img className='w-36 h-36 md:w-44 md:h-44 object-cover lg:left-8 right-24 sm:right-44 md:right-36 lg:right-0 md:-bottom-14 rounded-full border-2 border-gray-500 absolute' src={userProfile?.image} alt="" />
            </div>
            <div className="mt-16 md:p-5 p-1">
                <h3 className='text-2xl font-semibold'>{userProfile.name}</h3>
                <div className='md:flex justify-between'>
                    <p className='flex items-center gap-2 mt-2'><span><TfiEmail /></span>{userProfile.email}</p>
                    <p className='flex items-center gap-2 mt-3'><span><MdMergeType /></span><span className='bg-slate-100 px-2 py-1 rounded-md'>{userProfile.userType}</span></p>
                </div>
                <p className='flex items-center gap-2 mt-3'><span><FaPhone /></span>{userProfile.phone}</p>
                {/* form*/}

                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto pt-5">
                    <div className='md:flex items-center gap-3 space-y-2 md:space-y-0 mb-3'>
                        {/* picture */}
                        <div className="w-full flex items-center gap-1.5">
                            <input name='image' placeholder='Upload' id="fileInput" hidden
                                {...register('photoFile', { required: 'Please upload a photo' })}
                                type="file" accept='image/*' />
                            <label htmlFor="fileInput" className='bg-red-300 py-2 px-2 rounded-md text-center text-white font-semibold w-full'>Upload Profile Picture</label>
                            </div>
                    <Button type="submit" className="w-full bg-red-700">Update</Button>
                    </div>
                            {errors.photoFile && <p className='text-red-500 text-xs'>{errors.photoFile.message}</p>}
                </form>
            </div>

        </div>
    );
};

export default MyProfile;