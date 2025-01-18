import DashboardHeader from '@/components/ui/DashboardHeader';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import ChekoutForm from './ChekoutForm';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK) 
const CheckOut = () => {
    const {id} = useParams()
    return (
        <div>
            <DashboardHeader title='Checkout'></DashboardHeader>
            <div>
                <Elements stripe={stripePromise}>
                    <ChekoutForm id={id}></ChekoutForm>
                </Elements>
            </div>


        </div>
    );
};

export default CheckOut;