import './App.css';
import { NavBar } from './components/NavBar'
import { JobBoard } from './pages/JobBoard'
import  Dashboard from './pages/Dashboard';
import  { Profile }  from './pages/Profile';
import  Signup  from './pages/Signup';
import  Login from './pages/Login';
import Setting from './pages/Settings';
import { Routes, Route } from "react-router-dom";
import React from 'react';

function App() {
  return (
    <div>
      <header>
        <Routes>  
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />    
          <Route path="/JobBoard"  element={<> <NavBar /> <JobBoard /> </>} />
          <Route path="/dashboard" element={<> <NavBar /> <Dashboard /> </>} />
          <Route path="/profile" element={<> <NavBar /> <Profile /> </> } />
          <Route path="/setting" element={<> <NavBar /> <Setting /> </> } />
        </Routes>
      </header>
    </div>
  );
}

export default App;