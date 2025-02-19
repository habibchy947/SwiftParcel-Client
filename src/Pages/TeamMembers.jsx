import Header from '@/components/ui/Header';
import Loading from '@/components/ui/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa6';

const TeamMembers = () => {
    const {data: teams=[], isLoading} = useQuery({
        queryKey: ['teams'],
        queryFn: async () => {
            const {data} = await axios('/team.json')
            return data
        }
    })
    return (
        <div className='pt-10 w-11/12 mx-auto mb-10'>
            <Header title={'Meet Our Team'}></Header>
                {isLoading && <Loading></Loading>}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    teams.map((team,index)=> (
                        <div key={index} className='bg-white dark:bg-gray-800 shadow-xl  overflow-hidden text-center'>
                            <img className='w-full h-56 object-cover' src={team.image} alt="" />
                            <h3 className='text-xl font-semibold text-red-600 mt-4 '>{team.name}</h3>
                            <p className='text-gray-500 dark:text-gray-300'>{team.role}</p>
                            <div className='flex justify-center space-x-4 mt-3 mb-4 dark:text-gray-400 text-gray-600'>
                                <FaTwitter className='hover:text-red-500'></FaTwitter>
                                <FaFacebookF className='hover:text-red-500'></FaFacebookF>
                                <FaLinkedinIn className='hover:text-red-500'></FaLinkedinIn>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TeamMembers;