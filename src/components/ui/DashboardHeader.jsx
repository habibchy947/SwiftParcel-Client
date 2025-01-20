import React from 'react';

const DashboardHeader = ({title}) => {
    return (
        <div className='pb-4'>
            <h3 className='text-4xl md:text-4xl font-bold'>{title}</h3>
            <div className='border-2 mt-2 w-[100px] border-red-600'></div>
            
        </div>
    );
};

export default DashboardHeader;