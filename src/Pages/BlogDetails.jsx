import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
    const {id} = useParams()
    const {data: blog={}} = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const {data} = await axios('/blogs.json')
            const singleBlog = data.find((b) => b.id == id)
            return singleBlog
        }
    })
    console.log(blog)
    return (
        <div className='mx-auto pt-20 bg-white'>
            <img src={blog.image} alt="" className='h-[400px] w-full object-cover' />
            <div className='w-11/12 mx-auto pt-5'>
            <h2 className='text-3xl font-bold my-4'>{blog.title}</h2>
            <p className='text-gray-500 text-sm mb-4'>Published on {blog.date}</p>
            <p className='text-gray-700 leading-relaxed'>{blog.description}</p>
            </div>
        </div>
    );
};

export default BlogDetails;