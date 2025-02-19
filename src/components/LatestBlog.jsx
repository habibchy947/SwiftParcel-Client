import React from 'react';
import Header from './ui/Header';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LatestBlog = () => {
    const {data: blogs=[]} = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const {data} = await axios('/blogs.json')
            return data
        }
    })
    return (
        <div className='w-11/12 mx-auto'>
            <Header title={'Latest Blog'}></Header>
            <div className='grid grid-cols-1  md:grid-cols-3 gap-6'>
                {
                    blogs.map((blog, index) => (
                        <div key={index} className='bg-white shadow-lg rounded-lg overflow-hidden'>
                            <img src={blog.image} alt="" className='w-full h-48 object-cover' />
                            <div className='p-5'>
                                <h3 className='text-xl font-semibold mb-2 '>{blog.title}</h3>
                                <p className='text-gray-600 mb-4 text-sm'>{blog.description.slice(0,75)}</p>
                                <p className='text-gray-500 text-xs mb-2'>Published on {blog.date}</p>
                                <Link to={`/blog/${blog.id}`}>Read More →</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default LatestBlog;