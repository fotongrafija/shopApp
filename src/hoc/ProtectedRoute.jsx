


import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../context/context";
import LoadingSpinner from "../components/LoadingSpinner";


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ role }) => {

    const { isLoading, isAuthenticated, signedUserRole, token } = useAuth();


    if (isLoading) return <LoadingSpinner />;

    if (!token ) {
      return <Navigate to="/login" replace />;
    } 
  
    // if (signedUserRole !== role) {
    //   return <Navigate to="/login" replace />;
    // }
    

    return <Outlet />;
};

export default ProtectedRoute
