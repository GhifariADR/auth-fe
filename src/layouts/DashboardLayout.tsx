import React, { useEffect, useState } from 'react'
import { getUsername } from '../utils/token'

const DashboardLayout:React.FC = () => {

    const [username, setUsername] = useState<string|null>(null)

    useEffect(() => {
        setUsername(getUsername())
    },[username])

  return (
    <div>
        <div className='container mt-5'>
            <h1>Hai {username} , Selamat datang di dashboard</h1>
        </div>
    </div>
  )
}

export default DashboardLayout