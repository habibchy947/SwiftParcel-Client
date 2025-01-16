import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './button';
import useAuth from '@/Hooks/useAuth';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { data, useNavigate } from 'react-router-dom';
import { Input } from './input';
import { useForm } from 'react-hook-form';
import Loading from './Loading';

const GoogleSignIn = ({ title }) => {
    const axiosPublic = useAxiosPublic()
    const [exist, setExist] = useState(null)
    const [isExist, setIsExist] = useState(null)
    const navigate = useNavigate()
    const { googleLogin , loading} = useAuth()
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const handleGoogle = async () => {
        try {
            const result = await googleLogin()
            console.log(result.user)

            const email = result.user?.email

            const res = await axiosPublic.get(`/user/${email}`)
            const userExist = res.data
            if (!userExist) {
                setExist(result.user)
            } else {
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }
    const onSubmit = async (data) => {
        try {
            const userInfo = {
                name: exist?.displayName,
                email: exist?.email,
                image: exist?.photoURL,
                phone: data.phone,
                userType: 'user'
            }
            const res = await axiosPublic.post('/user', userInfo)
            console.log(res.data)

            reset()
            setExist(null)
            setIsExist(true)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
       
    }
    return (
        <div className='w-full'>
            <Button onClick={handleGoogle} className="bg-slate-100 flex items-center text-black hover:bg-slate-200 w-full text-lg mt-3"><FcGoogle />{title}</Button>
            {
                !isExist && exist &&
                <div>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex w-full items-center mt-4 space-x-2">
                            <Input type="number"
                                {...register('phone', {
                                    required: 'Phone no is required',
                                    pattern: {
                                        value: /^(?:\+8801|01)[3-9]\d{8}$/,
                                        message: 'Phone number is not valid'
                                    }
                                })}
                                placeholder="Enter your phone number" />

                            <Button type="submit" className="bg-red-700">Submit</Button>

                        </div>
                        {errors.phone && <p className='text-red-500 text-xs'>{errors.phone.message}</p>}
                    </form>
                </div>
            }
            <div className='divider'></div>
        </div>
    );
};

export default GoogleSignIn;