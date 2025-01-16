import React from 'react';
import signUpImg from '../assets/Login/login.png'
import logo from '../assets/favicon.png'
import { Input } from '@/components/ui/input';
import { ImSpinner } from "react-icons/im";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import GoogleSignIn from '@/components/ui/GoogleSignIn';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/Hooks/useAuth';

const Login = () => {
    const {signInUser, loading} = useAuth()
    const location = useLocation()
    const from = location.state
    const navigate = useNavigate()
    const { handleSubmit, register,reset, formState: { errors } } = useForm()
    
        const onSubmit = async (data) => {
            console.log(data)
            await signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                reset()
                navigate(from || '/')
            })
            .catch(err => {
                console.log(err)
            })

        }
    return (
        <div className="w-10/12 md:w-8/12  max-w-screen-xl py-10 mx-auto min-h-screen justify-center grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2 lg:gap-5 items-center">
            <div>
                <img className='w-96' src={signUpImg} alt="" />
            </div>
            <div>
                <div className=' flex flex-col justify-center items-center mb-1'>
                    <img className='w-12' src={logo} alt="" />
                    <span className=" text-3xl font-bebasNeue font-semibold whitespace-nowrap dark:text-white">SwiftParcel</span>
                    <p className='text-xl font-semibold tracking-wider'>Login to your account</p>
                    {/* <Button className="bg-slate-100 flex items-center text-black text-lg w-full mt-3"><FcGoogle />Sign in with Google</Button>
                    <div className='divider'></div> */}
                    <GoogleSignIn title='Sign in with Google'></GoogleSignIn>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                    {/* email field */}
                    <div className='w-full mb-3'>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email"
                            {...register('email', { required: 'Please enter a valid email address' })}
                            id="email"
                            placeholder="Enter your Email" />
                        {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}

                    </div>
                    <div className='flex items-center gap-3 mb-5'>
                        {/* password */}
                        <div className='w-full'>
                            <Label htmlFor="password">Password</Label>
                            <Input type="text"
                                {...register('password',
                                    {
                                        required: 'Password is required',
                                    })}
                                id="password"
                                placeholder="Enter a Password" />
                            {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-red-700">{loading ? <ImSpinner className='animate-spin'/> : 'Login'}</Button>
                </form>
                <p className='text-center pt-2'>New to this website? please <Link className="text-red-700" to='/signUp'>Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;