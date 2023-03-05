import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import CardOverview from '../components/CardOverview'


function CovidOverview() {
    const navigate = useNavigate()

    const {userId, caseId, userType} = useParams()


    const admin = () => {
        navigate('/admin/communicable-disease')
    }


  return (
    <>
    <div className="container">
    <Breadcrumbs event={admin} identifier="Dashboard / " current="Communicable disease"/>
    <h2 className='covid-overview'> Communicable disease overview</h2>
    <CardOverview userData={{userId, caseId, userType}}/>
    </div>
    </>
  )
}

export default CovidOverview