import signUpImg from '../assets/Login/login.png'
import logo from '../assets/favicon.png'
import { FcGoogle } from "react-icons/fc";
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { uploadImage } from '@/lib/utils';
import GoogleSignIn from '@/components/ui/GoogleSignIn';
import { Link } from 'react-router-dom';
import useAuth from '@/Hooks/useAuth';

const SignUp = () => {
    const {createUser, updateUserProfile} = useAuth()
    const { handleSubmit, register, setValue, reset, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        const image = data.photoFile[0]
            const photo = await uploadImage(image)
        console.log(data,photo)
        await createUser(data.email, data.password)
        .then(async result => {
            console.log(result.user)
            const profileInfo = {
                displayName: data.name,
                photoURL: photo
            }
            await updateUserProfile (profileInfo)
            .then(result => {
                console.log(result.user)
                reset()
            })
            .catch(err => {
                console.log(err)
            })

        })
        .catch(err => {
            console.log(err)
        })

    }
    return (
        <div className="w-10/12 md:w-9/12  max-w-screen-xl py-10 mx-auto min-h-screen justify-center grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2 lg:gap-5 items-center">
            <div>
                <img className='w-96' src={signUpImg} alt="" />
            </div>
            <div>
                <div className='mx-auto flex flex-col justify-center items-center mb-1'>
                    <img className='w-12' src={logo} alt="" />
                    <span className="self-center text-3xl font-bebasNeue font-semibold whitespace-nowrap dark:text-white">SwiftParcel</span>
                    <p className='text-xl font-semibold tracking-wider'>Create your account</p>
                    {/* <Button className="bg-slate-100 flex items-center text-black text-lg w-full mt-3"><FcGoogle />Sign Up with Google</Button>
                    <div className='divider'></div> */}
                    <GoogleSignIn title='Sign up with Google'></GoogleSignIn>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                    <div className='flex items-center gap-3 mb-3'>
                        {/* name field */}
                        <div className='w-full'>
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" {...register('name', { required: 'Name is required' })} id="name" placeholder="Enter your Name" />
                            {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}
                        </div>
                        {/* picture */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="picture">Picture</Label>
                            <Input id="picture"
                                {...register('photoFile', { required: 'Please upload a photo' })}
                                type="file" />
                            {errors.photoFile && <p className='text-red-500 text-xs'>{errors.photoFile.message}</p>}
                        </div>
                    </div>
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
                        {/* user type */}
                        <div className='w-full'>
                            <Label htmlFor="userType">User Type</Label>
                            <Select id="userType"
                                {...register('userType', { required: 'User type is required' })}
                                onValueChange={(value) => setValue('userType', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a user type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="deliveryMen">Delivery Men</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.userType && <p className='text-red-500 text-xs'>{errors.userType.message}</p>}
                        </div>
                        {/* password */}
                        <div className='w-full'>
                            <Label htmlFor="password">Password</Label>
                            <Input type="text"
                                {...register('password',
                                    {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
                                            message: 'Password must contain at least one uppercase and lowercase letter, one number, one special character and be at least 6 character long.'
                                        }
                                    })}
                                id="password"
                                placeholder="Enter a Password" />
                            {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-red-700">Sign Up</Button>
                </form>
                <p className='text-center pt-2'>Already have an account? please <Link className='text-red-700' to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default SignUp;