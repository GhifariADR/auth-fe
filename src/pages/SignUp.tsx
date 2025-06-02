import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from '../components/LoadingOverlay';
import { register } from '../api/authService';
import { toast } from 'react-toastify';
import { usePageTitle } from '../utils/usePageTitle';

const SignUp:React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate();
    usePageTitle("Register")


    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault();

        if(username == '' || email == '' || password == ''){
            toast.error("Please fill form")
            return
        }
        try{
            const response = await register({username,email,password});

            if (response.status == "error"){
                toast.error(response.message)
                return
            }

            toast.success(response.message)
            navigate('/')

            
        } catch(err) {
            console.log(err);
            
        } finally{
            setLoading(false)
        }

    }


  return (
    <div className='bg-image'>
        <div className='container'>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='card' >
                    <div className='row text-center'>
                        <h1>Register Account</h1>
                    </div>
                    <div className='row'>

                        <form onSubmit={handleSubmit}>
                            <div className='row mt-2'>
                                <input 
                                type='text'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='p-2 border rounded'
                                required
                                />
                            </div>

                            <div className='row mt-2'>
                                <input 
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='p-2 border rounded'
                                required
                                />
                            </div>

                            <div className='row mt-2'>
                                <input 
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='p-2 border rounded'
                                required
                                />
                            </div>
                       
                            <div className='row mt-5'>
                                <button type='submit' className='btn btn-primary text-white p-2 rounded'> Register</button>
                            </div>

                            <div className='row mt-3'>
                                <p>Already have account? <Link to='/'>Sign in here</Link> </p>
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

export default SignUp