import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useNavigate, useParams} from "react-router-dom"
import Breadcrumbs from '../components/Breadcrumbs'
import axios from 'axios'
import GeneratePdf from '../components/GeneratePdf'
import { CURRENT_SERVER_DOMAIN } from '../services/serverConfig'

const AttendanceRoom = () => {
    
    const { roomId } = useParams()
    const [userVisitedLists, setUserVisitedLists] = useState([])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [showPdfPreviewer, setShowPdfPreviewer] = useState(false)
    const [allRooms, setAllRooms] = useState([])
    const [noResultsFound, setNoResultsFound] = useState(false)

    const getAllRooms = async () => {
        const token = localStorage.getItem('token');
    
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };
    
        await axios
          .get(`${CURRENT_SERVER_DOMAIN}/rooms/allRooms`, {
            headers: headers,
          })
          .then((response) => {
            var returnArr = [];
            returnArr.push(response.data.data);
            setAllRooms(returnArr[0]);
    
            if (returnArr[0].length === 0) {
              setNoResultsFound(true);
            } else {
              setNoResultsFound(false);
            }
          })
    
          .catch((error) => {
            console.log('Error ' + error);
          });
      };
    
    useEffect(() => {
      getAllRooms();
    }, []);
    
    const currentRoom = allRooms?.find((currentRoom) => {
        const currentRoomId = currentRoom?.room_id ?? ''
        const isSameRoomId =  `${currentRoomId}` === roomId
        return isSameRoomId
    })

    const currentBuildingName = currentRoom?.building_name ?? ''
    const roomNumber = currentRoom?.room_number ?? ''
    
    const admin = () => {
        navigate(`/admin/attendance`)
    }
    
    useEffect(() => {
      getRoomVisitors(roomId * 1)
    }, [])
    const getRoomVisitors = async (room_id) => {
      setIsLoading(true)
      const token = localStorage.getItem('token');

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }

      await axios.post(`${CURRENT_SERVER_DOMAIN}/rooms/searchUsersByRoomId`, {room_id}, {
          headers: headers
        }).then(resp => {
            setIsLoading(false)
            if(resp?.data?.success === 0){
                return alert('An error occured')
            }
            if(resp.data.success === 1){
               return setUserVisitedLists(resp.data.data)
            } 
            
            alert('An error occured please try again later.')
    });
    setIsLoading(false)
      
    }

    const handleGeneratePDFReport = async () => {
       
        setShowPdfPreviewer(true)

    }
    
    const closePreviewer = async () => {
        setShowPdfPreviewer(false)
    }

  return (
    <div className='users'>
        {
            showPdfPreviewer?
            <GeneratePdf closePreviewer={closePreviewer} props={{roomId, roomNumber, buildingName: currentBuildingName}}/>
            :
            null
        }
    <Header />
    <div className="container" id="dataContainer">
    <Breadcrumbs event={admin} identifier="Dashboard / " current="Room"/>
       <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
       <p className="user-title">Users visited in {currentBuildingName} - Room : {roomNumber} </p>
       <button
         style={{backgroundColor: '#28cd41', color: 'white', padding: '1rem 2rem', borderRadius: '1rem', fontWeight: 'bold'}}
         onClick={() => {handleGeneratePDFReport(roomId, roomNumber, currentBuildingName)}}>Generate PDF</button>
       </div>
        {   
            isLoading?
            <p>Please wait...</p>
            :
            userVisitedLists.length === 0?
            <p>No user visited</p>
            :
            <table className='table-user'>
            <tr className='tr-user'>
                <th>UID</th>
                <th>type</th>
                <th>Fullname</th>
                <th>Phone no.</th>
                <th>Email</th>
            </tr>
            {
                        userVisitedLists && userVisitedLists?
                        userVisitedLists.map((data) => {
    
                            if(data.information === 'User not found'){
                                return
                            }
    
                            if(data.information.data === 'Not verified'){
                                return  <tr>
                                            <td>{data.information.id}</td>
                                            <td>{data.information.type}</td>
                                            <td>Not verified</td>
                                            <td>Not verified</td>
                                            <td>{data.information.email}</td>
                                        </tr>
                            }
                            
                            return <tr>
                                    <td>{data.information.id}</td>
                                    <td>{data.information.type}</td>
                                    <td>{data.information.data.firstname + " " + data.information.data.lastname}</td>
                                    <td>{data.information.data.mobile_number}</td>
                                    <td>{data.information.data.email}</td>
                                </tr>
                        })
                        :
                        null
                    }
                </table>
        }
     
    </div>
    <div className="spacer"></div>
    </div>
    
    

  )
}

export default AttendanceRoom