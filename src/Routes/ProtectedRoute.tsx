import { Navigate, Outlet } from 'react-router-dom';
import { clearToken, getToken, isTokenExpired} from '../utils/token';



const ProtectedRoute:React.FC = () => {

    const token = getToken();

    if(isTokenExpired()) {
        clearToken();
        return <Navigate to="/" replace />;
    }

    if (!token) {
        
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // Render nested child route
  
}

export default ProtectedRoute;