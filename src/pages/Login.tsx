import React, { useState } from 'react'
import "./Login.css"
import { login, type LoginRequest } from '../services/authService';
import axios from 'axios';
import { saveToken } from '../utils/token';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage]= useState<string | null>(null)
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setError(null);

        try{
            const response = await login({username, password});
            
            if(response.data == null){
                setError(response.message)
                
            }

            setToken(response.data.token)
            setMessage(response.message)

            console.log("token = " + response.data.token);
            
        } catch(err){
           console.log("");
           
        }
       
    }


  return (
    <div className='bg-image'>
        <div className='container'>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='card mt-5' >
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
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            {message && <div className="alert alert-success mt-3">{message}</div>}
                            
                        </form>

                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Login