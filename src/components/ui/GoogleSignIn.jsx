import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './button';

const GoogleSignIn = ({title}) => {
    return (
        <div className='w-full'>
            <Button className="bg-slate-100 flex items-center text-black hover:bg-slate-200 w-full text-lg mt-3"><FcGoogle />{title}</Button>
            <div className='divider'></div>
        </div>
    );
};

export default GoogleSignIn;