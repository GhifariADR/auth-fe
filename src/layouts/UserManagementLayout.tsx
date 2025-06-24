import React from 'react'
import UserList from '../components/user/UserList'

const UserManagementLayout:React.FC = () => {
    return (
        <div className='container'>
            <div className='row col-12'>
                <h1>User Management</h1>
            </div>
            <div className='row col-12'>
                <UserList/>
            </div>

        </div>
    )
}

export default UserManagementLayout