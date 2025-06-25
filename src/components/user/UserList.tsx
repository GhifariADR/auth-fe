import React, { useEffect, useState } from 'react'
import { getAllUser, type User } from '../../api/userService'
import { handleAxiosError } from '../../utils/handelAxiosError';
import { toast } from 'react-toastify';
import Pagination from '../Pagination';

const UserList:React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);


    const fetchUser = async (page:number) => {
        setLoading(true);

        try{
            const response = await getAllUser({
                page: page.toString(),
                sortBy : 'username',
                keyword,
                direction : 'ASC'
            })

            if (response.status === 'error'){
                toast.error(response.message, {
                    toastId : 'errorUser'
                })
                return
            }

            setUsers(response.data.users);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPage);
            console.log(response.data);
            

        } catch (err) {
            handleAxiosError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        if (keyword.length > 2) {
            setTimeout(()=>{
                fetchUser(0)
            }, 500)
        } else if ( keyword.length === 0) {
            fetchUser(0)
        }
        
    },[keyword])

  return (
    <div className='mt-5'>
        <div className='row'>
            <div className='col-md-6 col-sm-12 d-flex '>
                <label className='form-label mt-1 me-2' >Search</label>
                <input
                type='text'
                placeholder='Input keyword'
                value={keyword}
                className='form-control mb-3'
                onChange={(e) => {setKeyword(e.target.value)}}  
            />
            </div>
            
        </div>
        <div className='row'>
            <table className='table table-bordered table-striped'>
                <thead className='table-dark'>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) =>(
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center">No users found</td>
                        </tr>  
                    )}

                </tbody>
            </table>
        </div>
        

        <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={fetchUser}
        />
    </div>
  )
}

export default UserList