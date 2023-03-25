import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useNavigate} from "react-router-dom"
import Breadcrumbs from '../components/Breadcrumbs'
import axios from 'axios'
import { CURRENT_SERVER_DOMAIN } from '../services/serverConfig'


function User() {

    const [allUsers, setAllUsers] = useState([])

    const navigate = useNavigate()

    const admin = () => {
        navigate('/admin')
      }
      const userdata = () => {
        navigate('/admin/users/userdata')
      }

      useEffect(() => {
        handleGetData()
      }, [])
    
      const handleGetData = async() => {
        const token = localStorage.getItem('token');
    
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
    
        
        await axios
          .get(
            `${CURRENT_SERVER_DOMAIN}/user/getAllUsers`,
            {
              headers: headers,
            }
          ).then(resp => {
            setAllUsers(resp.data.data);
        });

    }
    
  return (
    <div className='users'>
         <Header />
         <div className="container">
         <Breadcrumbs event={admin} identifier="Dashboard / " current="Users"/>
            <p className="user-title">Users ({allUsers.length})</p>
                    
            <table className='table-user'>
             <tr className='tr-user'>
                 <th>UID</th>
                 <th>Full Name</th>
                 <th>Mobile No.</th>
                 <th>type</th>
                 <th>Email</th>
             </tr>
             <tbody>
                {allUsers?.map((user) => {
                        return <tr>
                                <td>{user?.user_id ?? 'Not verified'}</td>
                                <td className='nam'onClick={userdata}>{
                                    user?.information?.firstname ?? 'Not verified'
                                }
                                <span> </span>
                                {
                                    user?.information?.lastname ?? 'Not verified'
                                }</td>
                                <td>
                                    {
                                    user?.information?.mobile_number ?? 'Not verified'
                                    }
                                </td>
                                <td>{user?.userType ?? 'Not verified'}</td>
                                <td>{user?.email ?? 'Not verified'}</td>
                            </tr>
                  })}
                
             </tbody>
         </table>
         </div>
         <div className="spacer"></div>
         </div>
         
         

   
  )
}

export default User