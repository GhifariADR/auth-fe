import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearToken, getToken } from '../utils/token'
import { logout } from '../api/authService'
import { toast } from 'react-toastify'

const Navbar:React.FC = () => {

    const [token, setToken ] = useState<string | null>('');

    const navigate = useNavigate();

    useEffect(() => {
        setToken(getToken())
    })


    const handleLogout = async () => {


        if(!token) {
            toast.info("Token tidak tersedia, tidak bisa logout");
            return
        }

        try{
            const response = await logout({token})

            if (response.status == "error"){
                toast.error(response.message)
                return
            }

            clearToken();
            navigate('/')
            toast.success(response.message)

        } catch(err) {
            console.log(err);
            
        }

        
    }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/dashboard">MyApp</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <button className="btn btn-sm btn-outline-light ms-3" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar