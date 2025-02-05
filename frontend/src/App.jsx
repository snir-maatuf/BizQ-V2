import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './features/Generics/NavBar';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import FilteredBusinessesPage from './pages/FilteredBusinessesPage';
import Background from './features/Generics/Background';
import LoginPage from './pages/LoginPage';
import AppointmentPage from './pages/AppointmentPage';
import BusinessOwnerPage from './pages/BusinessOwnerPage';
import SchedulerPage from './pages/SchedulerPage';
import { getLocationByIP } from './api/Location';
import BusinessDetailsPage from './pages/BusinessDetailsPage';
import BusinessManagement from './pages/BusinessManagement';
import CancelAppointment from './pages/CancelAppointment';

function App() {
  useEffect(() => {
    getLocationByIP();
  }, []);
  return (
    <Router>
      <Background />
      <div
        className='app_page'
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        <NavBar />
        <div
          className='pages_content'
          style={{ flex: 1, overflowY: 'auto', marginTop: '10vh' }}
        >
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/Login' element={<LoginPage />}/>
            <Route path='/SchedulerPage' element={<SchedulerPage/>}/>
            <Route path='/BusinessDetails/:userId' element={<BusinessDetailsPage/>}/>
            <Route path='/BusinessManagement' element={<BusinessManagement/>}/>
            <Route path='/SignUp/:userId?' element={<SignUpPage/>}/>
            <Route path='/BusinessOwner/:id' element={<BusinessOwnerPage/>}/>
            <Route path='/FilterBusiness/:category' element={<FilteredBusinessesPage/>}/>
            <Route path='/FilterBusiness/all' element={<FilteredBusinessesPage/>}/>
            <Route path='/Appointment/:id' element={<AppointmentPage/>}/>
            <Route path='/CancelAppointment/:appointmentId' element={<CancelAppointment/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;