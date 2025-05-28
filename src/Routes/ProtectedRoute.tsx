import { Navigate, Outlet } from 'react-router-dom';
import { getToken, isTokenExpired } from '../utils/token';
import { logout } from '../api/authService';
import { toast } from 'react-toastify';


const ProtectedRoute:React.FC = () => {

  const token = getToken();

  const handleLogout = async () => {
    try {
      const response = await logout({token});
      toast.success(response.message)
      return <Navigate to="/" replace />;

    } catch(err){
      console.log(err);
      toast.error("error")
    }
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if(isTokenExpired()) {
    handleLogout();
  }


  return <Outlet />; // Render nested child route
  
}

export default ProtectedRoute;