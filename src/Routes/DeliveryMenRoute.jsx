import Loading from '@/components/ui/Loading';
import useAuth from '@/Hooks/useAuth';
import useRole from '@/Hooks/useRole';
import React from 'react';
import { Navigate } from 'react-router-dom';

const DeliveryMenRoute = ({children}) => {
    const [role, isLoading] = useRole()
    if(isLoading) {
        return <Loading></Loading>
    }
    if(role === 'deliveryMen') {
        return children
    }
    return  <Navigate to='/dashboard'></Navigate>
};

export default DeliveryMenRoute;