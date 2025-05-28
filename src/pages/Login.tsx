import React, { useState } from 'react'
import "../style/Login.css"
import { login } from '../api/authService';
import { saveToken } from '../utils/token';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from '../components/LoadingOverlay';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault();
        

        try{
            const response = await login({username, password});
            
            if(response.data == null){
                toast.error(response.message)
            } else {
                setToken(response.data.token)
                toast.success(response.message)           
                console.log("token = " + response.data.token);
                saveToken(response.data.token)
                navigate('/dashboard')
            }
            
        } catch(err){
           console.log("");
           
        } finally {
            setLoading(false)
        }
       
    }

  return (
    <div className='bg-image'>
        <div className='container'>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='card' >
                    <div className='row text-center'>
                        <h1>Login Account</h1>
                    </div>
                    <div className='row'>

                        <form onSubmit={handleSubmit}>
                            <div className='row mt-2'>
                                <input 
                                type='text'
                                placeholder='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='p-2 border rounded'
                                required
                                />
                            </div>

                            <div className='row mt-2'>
                                <input 
                                type='password'
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='p-2 border rounded'
                                required
                                />
                            </div>
                            <div className='row'>
                                <p><Link to='/forgot-password'>Forgot Password ?</Link> </p>
                            </div>

                            <div className='row mt-3'>
                                <button type='submit' className='btn btn-primary text-white p-2 rounded'> Login</button>
                            </div>

                            <div className='row mt-3'>
                                <p>don't have any account? <Link to='/sign-up'>Sign up here</Link> </p>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
        <LoadingOverlay show={loading}/>
    </div>
  )
}

export default Login