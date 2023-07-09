
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";


const RequireAuth = () => {
  
    const token = localStorage.getItem('og');
    const isAuthenticated = !!token;
    const location = useLocation();
    console.log(token)
    return token ? (
        <Outlet />
    ) : (
            <Navigate to="/signin" state={{ from: location }} replace />
    );
};
export default RequireAuth;

