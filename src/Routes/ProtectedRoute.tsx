import { type JSX } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/token';


const ProtectedRoute:React.FC = () => {

  const token = getToken();
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render nested child route
  
}

export default ProtectedRoute;