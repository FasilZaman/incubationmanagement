import React from 'react';
import Loginpage from './pages/Loginpage';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signuppage from './pages/Signuppage';
import Userhome from './components/Userhome/Userhome';
import Adminloginpage from './pages/Adminloginpage';
import Adminapplicationlist from './pages/Adminapplicationlist';
import Recordtrackpage from './pages/Recordtrackpage';
import Adminbookingslotspage from './pages/Adminbookingslotspage';
import Userhomepage from './pages/Userhomepage';
import Userproccessingpage from './pages/Userproccessingpage';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Loginpage />} />
          <Route path='/signup' element={<Signuppage />} />  
          <Route path='/userhome' element={<Userhomepage />} />       
          <Route path='/adminlogin' element={<Adminloginpage />} />
          <Route path='/applicationlist' element={<Adminapplicationlist />} />
          <Route path='/recordtrack' element={<Recordtrackpage />} />
          <Route path='/bookingslots' element={<Adminbookingslotspage />} />
          <Route path='/proccessing' element={<Userproccessingpage />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
