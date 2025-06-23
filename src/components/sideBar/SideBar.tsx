import React, { useEffect, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import { clearToken, getToken, getUsername, isAdmin } from '../../utils/token';
import { logout } from '../../api/authService';
import { toast } from 'react-toastify';
import { handleAxiosError } from '../../utils/handelAxiosError';
import LoadingOverlay from '../LoadingOverlay';
import '../../style/SideBar.css';
import DropdownSidebar from './DropdownSidebar';

const SideBar:React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>('');
    const [username, setUsername] = useState<string | null>('');
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate();
    
    const toogleSideBar = () => setIsOpen(!isOpen);

    useEffect(()=>{
        setToken(getToken());
        setUsername(getUsername());
    },[username])

    const handelLogout = async () => {

        setLoading(true)
        if(!token) {
            toast.error("Token unavailable")
            return
        }
        try{
            const response = await logout({token});

            if (response.status === 'error'){
                toast.error(response.message);
                return
            }

            clearToken();
            navigate('/')
            toast.success(response.message);

        } catch(err) {
            handleAxiosError(err);
        } finally{
            setLoading(false)
        }
    }
    
  return (
    <div>
        <div>
            <button className='btn btn-light m-2 z-1 ' onClick={toogleSideBar}>
                {isOpen ? <FaTimes/> : <FaBars/>}
            </button>
        </div>
        
      {!isOpen && (
        <div
          className="d-none d-md-block position-fixed top-0 start-0 bg-dark"
          style={{
            width: '60px',
            height: '100vh',
            zIndex: 1049,
          }}
        >
            <button className='btn btn-light top-0 start-0 m-2 z-1' onClick={toogleSideBar}>
                {isOpen ? <FaTimes/> : <FaBars/>}
            </button>
        </div>
        
      )}
        
        <div className={`bg-dark text-white position-fixed top-0 start-0 h-100 p-3 d-flex flex-column justify-content-between z-3 shadow ${isOpen ? 'd-block' : 'd-none'}`} style={{width:'250px'}}>
            <div>
                <button className='btn btn-light justify-content-end float-end' onClick={toogleSideBar}>
                    {isOpen ? <FaTimes/> : <FaBars/>}
                </button>
            </div>
            <div className='p-3 border-bottom border-secondary d-flex align-items-center gap-2'>
                <a className='navbar-brand'>
                    <img width={'60px'} src='../public/logo.png'/>
                    
                </a>
            </div>
            <div className='p-3 flex-grow-1 overflow-auto'>
                <ul className='nav flex-column'>
                    <li className='nav-item mb-2'>
                        <Link className='nav-link text-white' to='/dashboard'>Dashboard</Link>                      
                    </li>

                    {isAdmin() && (
                        <DropdownSidebar
                        title='Admin'
                        subMenu={[{label: 'User Management', to : '/userManagement'},{label: 'Role Managenet', to : '/'}]} 
                    />)}
                    
                </ul>
            </div>
            <div className="border-top border-secondary pt-3 d-flex justify-content-between align-items-center">
                <span className='text-capitalize'>{username}</span>
                <button className="btn btn-sm btn-outline-light" onClick={handelLogout}>Logout</button>
            </div>
        </div>
        <LoadingOverlay show={loading}/>
    </div>
  )
}

export default SideBar