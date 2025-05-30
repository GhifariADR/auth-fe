import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../utils/token'

const PublicRoute:React.FC = () => {

    const token = getToken();

    if(token){
        return <Navigate to='/dashboard' replace />
    }

    return <Outlet/>
  
}

export default PublicRoute