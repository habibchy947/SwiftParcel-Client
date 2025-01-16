import Loading from '@/components/ui/Loading';
import useAuth from '@/Hooks/useAuth';
import useRole from '@/Hooks/useRole';
import React from 'react';
import { useLocation } from 'react-router-dom';

const DeliveryMenRoute = ({children}) => {
    const location = useLocation()
    const {user, loading} = useAuth()
    const [role, isLoading] = useRole()
    if(loading || isLoading) {
        return <Loading></Loading>
    }
    if(user && role === 'deliveryMen') {
        return children
    }
    return  <Navigate to='/dashboard' state={location.state}></Navigate>
};

export default DeliveryMenRoute;