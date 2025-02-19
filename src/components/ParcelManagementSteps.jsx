import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaBox, FaCreditCard, FaTruck } from 'react-icons/fa6';
import Header from './ui/Header';
import { motion } from "motion/react"

const ParcelManagementSteps = () => {
    const steps = [
        {
            title: "Book a Parcel",
            description: "Enter details and choose a shipping option.",
            icon: <FaBox />,
        },
        {
            title: "Make Payment",
            description: "Secure checkout with multiple payment options.",
            icon: <FaCreditCard />,
        },
        {
            title: "Track Your Shipment",
            description: "Get real-time updates on delivery status.",
            icon: <FaTruck />,
        },
        {
            title: "Receive Your Parcel",
            description: "Delivered safely to your doorstep.",
            icon: <FaCheckCircle />,
        },
    ];
    return (
        <div className='w-11/12 mx-auto'>
            <Header title={'Our Process'}></Header>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8'>
                {
                    steps.map((step, index) => (
                        <motion.div key={index} className='bg-white border-gray-200  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-6 rounded-xl border flex flex-col justify-center items-center shadow-lg text-center'
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="text-red-600 text-4xl mb-4">{step.icon}</div>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{step.description}</p>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    );
};

export default ParcelManagementSteps;