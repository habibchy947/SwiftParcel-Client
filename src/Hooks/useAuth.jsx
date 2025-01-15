import { AuthContext } from '@/Provider/AuthProvider';
import React, { useContext } from 'react';

const useAuth = () => { 
    const context = useContext(AuthContext)
    return context
};

export default useAuth;