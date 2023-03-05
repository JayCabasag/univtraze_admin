import  React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import user from '../assets/card__icon.png'
import cases from '../assets/cases-icon.png'
import death from '../assets/death-icon.png'
import died from '../assets/died-icon.png'
import Breadcrumbs from '../components/Breadcrumbs'
import back from '../assets/back-icon.png'
import { useNavigate} from "react-router-dom"
import axios from 'axios'
import CountUp from 'react-countup';

function Covidfulldetails() {

  const [localCases, setLocalCases] = useState(0)
  const [deaths, setDeaths] = useState(0)
  const [todayCases, setTodayCases] = useState(0)
  const [todayDeaths, setTodayDeaths] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [todayRecovered, setTodayRecovered] = useState(0)
  const [active, setActive] = useState(0)
  const [critical, setCritical] = useState(0)
  const [whileCounting, setWhileCounting] = useState(true)


  useEffect(() => {
    setInterval(() => {
      GetCovidData();
    }, 10000);
  }, [])
  
  const GetCovidData = async () => {
    await axios.get('https://disease.sh/v3/covid-19/countries/PH?strict=true').then(resp => {
      const data = resp.data;

      setLocalCases(data.cases)
      setDeaths(data.deaths)
      setTodayCases(data.todayCases)
      setTodayDeaths(data.todayDeaths)
      setRecovered(data.recovered)
      setTodayRecovered(data.todayRecovered)
      setActive(data.active)
      setCritical(data.critical)

      });
  }

    const navigate = useNavigate()

    const admin = () => {
        navigate('/admin')
      }
  return (
    <div className='covidfulldetails'>
        <Header/>

        <div className="container">
        <Breadcrumbs event={admin} identifier="Dashboard / " current="Local covid report"/>
        <p className="covid-local">Covid Local Full Report</p>
        
        <div className="card-container">
            <Card  label="Local Cases" data=  {
                  whileCounting === true ?
                  <CountUp
                    start={0}
                    end={localCases}
                    duration={2} 
                    onStart={() => {setWhileCounting(true)}}
                    onEnd={() => {setWhileCounting(false)}}        
                  />
                  :
                  localCases.toLocaleString()
                } 
                design="cards card-1"icon={user} />
            <Card  label="Today Cases" data=  {
                  whileCounting === true ?
                  <CountUp
                    start={0}
                    end={todayCases}
                    duration={2} 
                    onStart={() => {setWhileCounting(true)}}
                    onEnd={() => {setWhileCounting(false)}}        
                  />
                  :
                  todayCases.toLocaleString()
                } 
                design="secondary-cards card-2" icon={cases}/>
            <Card label="Deaths" data={
                  whileCounting === true ?
                  <CountUp
                    start={0}
                    end={deaths}
                    duration={2} 
                    onStart={() => {setWhileCounting(true)}}
                    onEnd={() => {setWhileCounting(false)}}        
                  />
                  :
                  deaths.toLocaleString()
                }  
                design="secondary-cards card-3" icon={death}/>
            <Card label="Today Deaths" data={
                  whileCounting === true ?
                  <CountUp
                    start={0}
                    end={todayDeaths}
                    duration={2} 
                    onStart={() => {setWhileCounting(true)}}
                    onEnd={() => {setWhileCounting(false)}}        
                  />
                  :
                  todayDeaths.toLocaleString()
                }
                 design="secondary-cards card-4" icon={died}/>
            <div className="analytics">
              <p className="covid-update">Others</p>
              <div className="covid-details">
                <p className="recovered">Recovered</p>
                <p className="datos">
                {
                  whileCounting === true ?
                  <CountUp
                    start={0}
                    end={recovered}
                    duration={2} 
                    onStart={() => {setWhileCounting(true)}}
                    onEnd={() => {setWhileCounting(false)}}        
                  />
                  :
                  recovered.toLocaleString()
                }
                  </p>
                <p className="today-recovered">Today Recovered</p>
                <p className="datos"> {
                  whileCounting === true ?
                  <CountUp
                    start={0}
                    end={todayRecovered}
                    duration={2} 
                    onStart={() => {setWhileCounting(true)}}
                    onEnd={() => {setWhileCounting(false)}}        
                  />
                  :
                  todayRecovered.toLocaleString()
                }</p>
                <p className="today-recovered">Active</p>
                <p className="datos">{
                  whileCounting === true ?
                  <CountUp
                    start={0}
                    end={active}
                    duration={2} 
                    onStart={() => {setWhileCounting(true)}}
                    onEnd={() => {setWhileCounting(false)}}        
                  />
                  :
                  active.toLocaleString()
                }</p>
                <p className="today-recovered">Critical</p>
                <p className="datos">          {
                  whileCounting === true ?
                  <CountUp
                    start={0}
                    end={critical}
                    duration={2} 
                    onStart={() => {setWhileCounting(true)}}
                    onEnd={() => {setWhileCounting(false)}}        
                  />
                  :
                  critical.toLocaleString()
                }</p>
              </div>
              </div>
            </div>
        </div>

    </div>
  )
}

export default Covidfulldetails