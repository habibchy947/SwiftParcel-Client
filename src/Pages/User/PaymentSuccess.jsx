import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React from 'react';
import Confetti from 'react-confetti'
import { Helmet } from 'react-helmet-async';
import { MdVerified } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Helmet>
                            <title>SwiftParcel | Payment Success</title>
                        </Helmet>
            <Confetti className='w-full h-full'
            />
            <div className='flex items-center justify-center min-h-screen'>
            <Card className="p-5">
                <MdVerified className='text-green-600 text-3xl'/>
                <h3 className='text-3xl mt-3 font-semibold'>Payment Succeeded!</h3>
                <p className='text-lg mt-3 font-semibold'>Thank you for processing your most recent payments.</p>
                <Button onClick={() => navigate('/dashboard/myParcel')} className="bg-red-400 mt-5">Your Parcels</Button>
            </Card>
            </div>
        </div>
    );
};

export default PaymentSuccess;