import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './App.css';

import { NavBar } from './components/NavBar'
import { JobBoard } from './pages/JobBoard'
import { Dashboard } from './pages/Dashboard';
import { Profile }  from './pages/Profile';
import { Signup }  from './pages/Signup';
import { Login } from './pages/Login';

function App() {
  const navigate = useNavigate()
  
  return (
    <div>
      <header>
        <Routes>  
          <Route index element={<> <NavBar /> <JobBoard /> </>} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />   
          <Route path="/JobBoard"  element={<> <NavBar /> <JobBoard /> </>} />
          <Route path="/dashboard/" element={<> <NavBar /> <Dashboard/> </>} />
          <Route path="/profile" element={<> <NavBar /> <Profile /> </> } />
        </Routes>
      </header>
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </div>
  );
}

export default App;