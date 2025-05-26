import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearToken, getToken, getUsername } from '../utils/token'
import '../style/Navbar.css'
import { logout } from '../api/authService'
import { toast } from 'react-toastify'

const Navbar:React.FC = () => {

    const [token, setToken ] = useState<string | null>('');
    const [username, setUsername ] = useState<string | null>('');

    const navigate = useNavigate();

    useEffect(() => {
        setToken(getToken());
        setUsername(getUsername());
    },[username])


    const handleLogout = async () => {

      if(!token) {
          toast.info("Token unavailable");
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
    <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between">
      <div>
        <Link className="navbar-brand" to="/dashboard">MyApp</Link>
      </div>
      
      <div className="d-md-flex gap-5 d-none text-white">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
      </div>

      <div className="d-flex align-items-center gap-5 mx-2">
        {/* Dropdown user */}
        <div className="dropdown hover-dropdown">
          <div
            className="d-flex align-items-center gap-2 dropdown-toggle"
            role="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="text-white text-capitalize">{username}</span>
            <div
              style={{
                backgroundColor: "white",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
            ></div>
          </div>

          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <button className="dropdown-item" onClick={() => navigate("/profile")}>
                Profile
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* <div className='d-flex align-items-center gap-3 logout-wrapper'>
        <div className='text-white'>{username}</div>
        <div className='avatar' style={{backgroundColor : 'white', width:'30px' ,height: '30px', borderRadius:'50px'}}/>
        
        <div className='logout-container'>
          <button className="btn btn-sm btn-outline-light ms-3" onClick={handleLogout}>Logout</button>
        </div>
        

      </div> */}
      
    </nav>
  )
}

export default Navbar