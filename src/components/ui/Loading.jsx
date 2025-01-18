import React from 'react';
import { ImSpinner9 } from 'react-icons/im';

const Loading = () => {
    return (
        <div className='flex justify-center py-20'>
            <ImSpinner9 className='animate-spin text-3xl md:text-5xl text-red-600' />
        </div>
    );
};

export default Loading;