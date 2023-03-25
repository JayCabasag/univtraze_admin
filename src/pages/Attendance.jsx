import React from 'react'
import Header from '../components/Header'
import Breadcrumbs from '../components/Breadcrumbs'
import { useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CURRENT_SERVER_DOMAIN } from '../services/serverConfig'


const Attendance = () => {
    const navigate = useNavigate()

    const [allRooms, setAllRooms] = useState([])

    useEffect(() => {
        const handleGetAllRooms = async () => {
        
            const token = localStorage.getItem('token');
    
            const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            };
    
            await axios
            .get(
                `${CURRENT_SERVER_DOMAIN}/rooms/allRooms`,
                {
                headers: headers,
                }
            ).then(resp => {
                setAllRooms(resp?.data?.data);
            });
        }
        handleGetAllRooms()
    }, [])

    const admin = () => {
        navigate('/admin')
    }

    const attendance = (room_id) => {
        navigate(`/admin/attendance-room/${room_id}`)
    }

  return (
    <div className='attendance'>
        <Header/>
        <div className="container">
            <Breadcrumbs event={admin} identifier="Dashboard / " current="Attendance"/>
            <div className="cons">
            <p className="emergency">Attendance</p>
            </div>
            <div className="card-storage">

                {
                    allRooms.map((room) => {
                        return   <div className="room" onClick={() => {attendance(room?.room_id ?? '')}}>
                                    <p className="room__title">{room?.room_number ?? ''}</p>
                                    <p className="room__section">{room?.room_name ?? ''}</p>
                                    <p className="room__content">{
                                        room?.totalUserVisited ?? ''
                                    } scanned this room</p>
                                </div> 
                    })
                }
               
                <div className="spacer"></div> 
                
                
            </div>
            </div>

    </div>
  )
}

export default Attendance