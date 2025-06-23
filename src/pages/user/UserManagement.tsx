import React from 'react'
import SideBar from '../../components/sideBar/SideBar'
import UserManagementLayout from '../../layouts/UserManagementLayout'

const UserManagement:React.FC = () => {
    return (
        <div>
            <SideBar/>
            <UserManagementLayout/>
        </div>
    )
}

export default UserManagement