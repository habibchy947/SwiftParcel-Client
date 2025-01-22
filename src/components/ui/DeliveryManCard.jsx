import React from 'react';
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md';
import Rating from 'react-rating';
const DeliveryManCard = ({ deliveryMen }) => {

    return (
        <div className="w-full bg-white border p-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center">
                <img className="w-44 h-44 mb-3 rounded-full object-cover shadow-lg" src={deliveryMen.deliveryMenImage} alt="Bonnie image" />
                <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{deliveryMen.deliveryMenName}</h5>
                <div className='flex items-center justify-between gap-4 lg:gap-10 mt-3'>
                    <p className='flex items-center gap-2'><span className="text-base text-gray-800 font-semibold dark:text-gray-400">Delivered : </span>
                        <span>
                            {deliveryMen.numberOfParcelsDelivered}
                        </span></p>
                    <p className=''>
                        <span>
                            <Rating
                                readonly
                                className='text-lg'
                                initialRating={deliveryMen.averageRating}
                                emptySymbol={<MdOutlineStarOutline />}
                                fullSymbol={<MdOutlineStarPurple500 className='text-yellow-400' />}
                                fractions={2}
                            />
                        </span>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default DeliveryManCard;