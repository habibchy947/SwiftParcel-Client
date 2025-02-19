import Header from './ui/Header';
import { motion } from "motion/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Rating from 'react-rating';
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md';
const Testimonials = () => {
    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const { data } = await axios('/testimonials.json')
            return data
        }
    })
    return (
        <div className='w-11/12 mx-auto'>
            <Header title={'Client Testimonials'}></Header>
            <Swiper
                spaceBetween={20}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="px-4 md:px-12"
            >
                {
                    testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                className='shadow-sm p-6 flex flex-col items-center text-center '
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <img className='w-20 h-20 rounded-full object-cover mb-4' src={testimonial.image} alt="f" />
                                <h3 className='text-lg font-semibold'>{testimonial.name}</h3>
                                <p className='text-sm text-gray-500 dark:text-gray-400'>{testimonial.role}</p>
                                <span>
                                    <Rating
                                        readonly
                                        className='text-lg'
                                        initialRating={testimonial.rating}
                                        emptySymbol={<MdOutlineStarOutline />}
                                        fullSymbol={<MdOutlineStarPurple500 className='text-yellow-400' />}
                                        fractions={2}
                                    />
                                </span>
                                <p className='text-gray-700 dark:text-gray-400 mt-4'>{testimonial.review}</p>
                            </motion.div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    );
};

export default Testimonials;