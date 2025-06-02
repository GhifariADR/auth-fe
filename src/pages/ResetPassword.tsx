import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import "../style/Login.css"
import LoadingOverlay from '../components/LoadingOverlay';
import { toast } from 'react-toastify';
import { resetPassword } from '../api/authService';
import { handleAxiosError } from '../utils/handelAxiosError';
import { usePageTitle } from '../utils/usePageTitle';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [verifyPassword, setVerifyPassword] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>("")
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    usePageTitle("Reset Password")

    useEffect(() => {
        setToken(searchParams.get('token'))
    })

    const handleSubmit = async (e:React.FormEvent)  =>{
        setLoading(true)
        e.preventDefault();

        if(newPassword != verifyPassword){
            toast.error("Unmatched Password")
            setLoading(false)
            return
        }

        try{
            const response = await resetPassword({token, newPassword})
            if(response.status == "error"){
                toast.error(response.message)
                return
            }
            toast.success(response.message)
            navigate('/')
        } catch(err){
            handleAxiosError(err)
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
                        <h1>Reset Password</h1>
                    </div>
                    <div className='row'>

                        <form onSubmit={handleSubmit}>

                            <div className='row mt-2'>
                                <input 
                                type='password'
                                placeholder='New Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='p-2 border rounded'
                                required
                                />
                            </div>
                        
                            <div className='row mt-2'>
                                <input 
                                type='password'
                                placeholder='Verify Password'
                                value={verifyPassword}
                                onChange={(e) => setVerifyPassword(e.target.value)}
                                className='p-2 border rounded'
                                required
                                />
                            </div>
                           
                            <div className='row mt-4'>
                                <button type='submit' className='btn btn-primary text-white p-2 rounded'>Reset Password</button>
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

export default ResetPassword