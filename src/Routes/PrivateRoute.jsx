import Loading from "@/components/ui/Loading";
import useAuth from "@/Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user, loading} = useAuth()
    if(loading) {
        return <Loading></Loading>
    }
    if(user) {
        return children
    }
    return (
        <Navigate to='/login' state={location.state}>
            
        </Navigate>
    );
};

export default PrivateRoute;