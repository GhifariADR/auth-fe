import React, { useState } from 'react'
import "../style/Login.css"
import LoadingOverlay from '../components/LoadingOverlay';
import { forgotPassword } from '../api/authService';
import { toast } from 'react-toastify';
import { handleAxiosError } from '../utils/handelAxiosError';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../utils/usePageTitle';

const ForgotPassword = () => {

  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  usePageTitle("Forgot Password")

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()

    try{

      if (!email) {
        toast.error("email not found")
        return
      }

      const response = await forgotPassword({email})
      
      if (response.status == "error") {
        toast.error(response.message)
        return
      }

      toast.success(response.message)

      
    } catch(err){
      handleAxiosError(err);
        
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
                        <h1>Forgot Password</h1>
                    </div>
                    <div className='row'>
                      <form onSubmit={handleSubmit}>
                          <div className='row mt-2'>
                              <input 
                              type='email'
                              placeholder='email'
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className='p-2 border rounded'
                              required
                              />
                          </div>    
                          <div className='row mt-5'>
                            <button type='submit' className='btn btn-primary text-white p-2 rounded'>Forgot Password</button>
                            <Link to='/'>Login</Link>
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

export default ForgotPassword