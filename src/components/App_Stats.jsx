import useAxiosPublic from '@/Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from './ui/Loading';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
const App_Stats = () => {
    const axiosPublic = useAxiosPublic()
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['app-stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/app-stats')
            return res.data
        }
    })
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1
    })
    const { parcelsBooked, users, delivered } = stats || {}
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div ref={ref} className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 pt-16'>
            {/* {
                inView && (
                    <div>
                        <CountUp prefix='' decimals={0} startOnMount={0} end={parcelsBooked} 
                    duration={7}/>
                    </div>
                )
            } */}
            <Card className="flex flex-col justify-center items-center p-3">
                <CardContent className="space-y-3 mb-0">
                    <CardTitle className="text-center text-6xl font-semibold">
                        {inView && (
                            <CountUp prefix='' decimals={0} startOnMount={0} end={parcelsBooked}
                                duration={5} />
                        )}
                    </CardTitle>
                    <h3 className='text-2xl text-gray-500 font-semibold'>Booked</h3>
                </CardContent>
            </Card>
            <Card className="flex flex-col justify-center items-center p-3">
                <CardContent className="space-y-3 mb-0">
                    <CardTitle className="text-center text-6xl font-semibold">
                        {inView && (
                            <CountUp prefix='' decimals={0} startOnMount={0} end={delivered}
                                duration={5} />
                        )}
                    </CardTitle>
                    <h3 className='text-2xl text-gray-500 font-semibold'>Delivered</h3>
                </CardContent>
            </Card>
            <Card className="flex flex-col justify-center items-center p-3">
                <CardContent className="space-y-3 mb-0">
                    <CardTitle className="text-center text-6xl font-semibold">
                        {inView && (
                            <CountUp prefix='' decimals={0} startOnMount={0} end={users}
                                duration={7} />
                        )}
                    </CardTitle>
                    <h3 className='text-2xl text-gray-500 font-semibold'>Users</h3>
                </CardContent>
            </Card>

        </div>
    );
};

export default App_Stats;