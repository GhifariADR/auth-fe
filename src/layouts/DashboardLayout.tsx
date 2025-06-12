import React, { useEffect, useState } from 'react'
import { getUsername } from '../utils/token'
import RentalUnitList from '../components/RentalUnitList'
import { Link } from 'react-router-dom'

const DashboardLayout:React.FC = () => {

    const [username, setUsername] = useState<string|null>(null)

    useEffect(() => {
        setUsername(getUsername())
    },[username])

  return (
    <div className='container mt-5'>
        <div className='row'>
            <h1>Hai <span className='text-capitalize'>{username}</span> , Selamat datang di dashboard</h1>
        </div>
        <div className='row mb-4'>
            <Link to='/unit-create-form'>
                <button style={{width: '100%'}} className='btn btn-primary fw-bold'>Add Unit</button>
            </Link>
            
        </div>
        <div className='row mt-3'>
          <RentalUnitList/>
        </div>
    </div>
  )
}

export default DashboardLayout