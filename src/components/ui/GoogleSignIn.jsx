import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './button';
import useAuth from '@/Hooks/useAuth';

const GoogleSignIn = ({title}) => {
    const {googleLogin} = useAuth()
    const handleGoogle = async () => {
        await googleLogin()
        .then(result => {
            console.log(result.user)
        })
        .catch(err => {
            console.log(err)
        })
        
    }
    return (
        <div className='w-full'>
            <Button onClick={handleGoogle} className="bg-slate-100 flex items-center text-black hover:bg-slate-200 w-full text-lg mt-3"><FcGoogle />{title}</Button>
            <div className='divider'></div>
        </div>
    );
};

export default GoogleSignIn;