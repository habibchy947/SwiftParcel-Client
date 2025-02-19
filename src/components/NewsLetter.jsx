import React from 'react';
import { MdAttachEmail } from "react-icons/md";
const NewsLetter = () => {
    return (
            <div className='py-20 px-16 mt-10 mx-auto bg-slate-50 dark:bg-gray-800 grid grid-cols-1 gap-10 md:grid-cols-2'>
                <div className='flex items-center gap-5'>
                    <MdAttachEmail className='text-6xl' />
                    <div>
                        <h2 className='text-2xl mb-3 md:text-3xl'>Newsletter and Get Updates</h2>
                        <p>Sign up for our newsletter to get up-to-date from us</p>
                    </div>
                </div>
                <div>
                    <div className="join w-full">
                        <input
                            type="text"
                            placeholder="Enter your mail here"
                            className="input input-bordered dark:bg-gray-700 w-2/3 join-item" />
                        <button className="btn border-none text-white bg-red-500 join-item">Submit</button>
                    </div>
                </div>
            </div>
    );
};

export default NewsLetter;