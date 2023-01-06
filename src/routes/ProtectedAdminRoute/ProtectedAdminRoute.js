import { useContext } from 'react';
import { UserContext } from '../../context';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
    const { userData } = useContext(UserContext);
    let location = useLocation();

    if (userData.userType !== 'admin') {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
