import './App.css';
import { NavBar } from './components/NavBar'
import { JobBoard } from './pages/JobBoard'
import { Dashboard } from './pages/Dashboard';
import { Profile }  from './pages/Profile';
import { Signup }  from './pages/Signup';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';
import { ForgotPass } from './pages/ForgotPass';
import { Routes, Route } from "react-router-dom";
import React from 'react';

function App() {
  return (
    <div>
      <header>
        <Routes>  
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />   
          <Route path="/ForgotPass" element={<ForgotPass />} /> 
          <Route path="/JobBoard"  element={<> <NavBar /> <JobBoard /> </>} />
          <Route path="/dashboard" element={<> <NavBar /> <Dashboard /> </>} />
          <Route path="/profile" element={<> <NavBar /> <Profile /> </> } />
          <Route path="/setting" element={<> <NavBar /> <Settings /> </> } />
        </Routes>
      </header>
    </div>
  );
}

export default App;