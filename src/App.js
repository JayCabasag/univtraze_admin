import './App.css';
import './Styles/main.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Userdata from './pages/Userdata';
import Covidreport from './pages/Covidreport';
import Covidfulldetails from './pages/Covidfulldetails';
import Emergencyreport from './pages/Emergencyreport';
import Attendance from './pages/Attendance';
import AddRoom from './pages/AddRoom';
import ViewRoom from './pages/ViewRoom';
import CovidOverview from'./pages/CovidOverview'
import AttendanceRoom from './pages/AttendanceRoom';
import Notifications from './pages/Notifications';
import ForgotPassword from './pages/ForgotPassword';
import ResetPasswordFromEmail from './pages/ResetPasswordFromEmail';
import AddClinicAdmin from './pages/AddClinicAdmin';
import AccountSettings from './pages/AccountSettings';



function App() {
 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/reset-password-from-email/:recovery_email&:recovery_password' element={<ResetPasswordFromEmail />} />
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/users' element={<User />} />
          <Route path='/admin/notifications' element={<Notifications />} />
          <Route path='/admin/communicable-disease' element={<Covidreport />} />
          <Route path='/admin/users/userdata' element={<Userdata/>} />
          <Route path='/admin/covidfulldetails' element={<Covidfulldetails/>} />
          <Route path='/admin/emergencyreport' element={<Emergencyreport/>} />
          <Route path='/admin/attendance' element={<Attendance/>} />
          <Route path='/admin/add-room' element={<AddRoom/>} />
          <Route path='/admin/add-clinic-admin' element={<AddClinicAdmin/>} />
          <Route path='/admin/account-settings' element={<AccountSettings/>} />
          <Route path='/admin/view-room' element={<ViewRoom/>} />
          <Route path='/admin/attendance-room/:roomId&:roomNumber&:buildingName' element={<AttendanceRoom/>} />
          <Route path='/admin/communicable-disease-overview/:userId/:caseId/:userType' element={<CovidOverview/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
