import React from 'react';

const DashboardHeader = ({title}) => {
    return (
        <div className='text-center pb-4'>
            <h3 className='text-4xl md:text-4xl font-bold'>{title}</h3>
            <div className='border-2 mt-2 w-[100px] border-red-600 mx-auto'></div>
            
        </div>
    );
};

export default DashboardHeader;