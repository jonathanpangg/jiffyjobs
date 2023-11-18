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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <header>
        <Routes>  
          <Route index element={<> <NavBar /> <JobBoard /> </>} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />   
          <Route path="/ForgotPass" element={<ForgotPass />} /> 
          <Route path="/JobBoard"  element={<> <NavBar /> <JobBoard /> </>} />
          <Route path="/dashboard" element={<> <NavBar /> <Dashboard /> </>} />
          <Route path="/profile" element={<> <NavBar /> <Profile /> </> } />
          <Route path="/setting" element={<> <NavBar /> <Settings /> </> } />
        </Routes>
      </header>
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            limit={1}
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