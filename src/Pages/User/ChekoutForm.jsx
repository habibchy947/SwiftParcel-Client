import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/Loading';
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChekoutForm = ({ id }) => {
    const [error, setError] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState("")
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const { data: parcel = {}, isLoading, refetch } = useQuery({
        queryKey: ['singleParcel', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`https://swift-parcel-server-eta.vercel.app/parcel/${id}`)
            return data
        }
    })
    // console.log(parcel.price)
        useEffect(() => {
            if(parcel?.price){
                axiosSecure.post('/create-payment-intent', { price: parcel.price })
                    .then(res => {
                        // console.log(res.data.clientSecret)
                        setClientSecret(res.data.clientSecret)
                    })
            }
        }, [axiosSecure, parcel?.price])
        if(isLoading) {
            return <Loading></Loading>
        }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements || !clientSecret) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log('payment error', error);
            setError(error.message)
        } else {
            // console.log('PaymentMethod', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            // console.log('confirm error')
        } else {
            // console.log("paymen intent", paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id)
                toast.success('Payment succedded')
                navigate('/dashboard/paymentSuccess')
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className='w-9/12 md:w-6/12 mx-auto py-10'>
            <CardElement
                className='border p-4 rounded-md'
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className='text-red-500'>{error}</p>
            {transactionId && <p className='text-green-500'>Transaction Id : {transactionId}</p>}
            <div className='flex justify-center pt-2'>
                <Button className="px-10 bg-red-300 font-bold" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </Button>
            </div>
        </form>
    );
};

export default ChekoutForm;