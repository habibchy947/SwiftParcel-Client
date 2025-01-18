import Loading from '@/components/ui/Loading';
import useAuth from '@/Hooks/useAuth';
import useRole from '@/Hooks/useRole';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    // const {user, loading} = useAuth()
    const [role, isLoading] = useRole()
    if(isLoading) {
        return <Loading></Loading>
    }
    if(role === 'admin') {
        return children
    }
    return  <Navigate to='/dashboard'></Navigate>
};

export default AdminRoute;