import React, { useEffect, useState } from 'react'
import "../style/Login.css"
import { login } from '../api/authService';
import { getToken, saveToken } from '../utils/token';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();

        if(token) {
            navigate('/dashboard');
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {

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

                            <div className='row mt-5'>
                                <button type='submit' className='btn btn-primary text-white p-2 rounded'> Login</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Login