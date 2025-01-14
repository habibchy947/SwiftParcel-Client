import React from 'react';

const Header = ({title}) => {
    return (
        <div className='text-center pt-16 pb-14'>
            <h3 className="text-5xl font-bold">{title}</h3>
            <div className='border-2 mt-3 w-[100px] border-red-600 mx-auto'></div>
        </div>
    );
};

export default Header;