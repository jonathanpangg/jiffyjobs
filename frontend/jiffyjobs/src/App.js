import './App.css';
import { NavBar } from './components/NavBar'
import { JobBoard } from './pages/JobBoard'
import { Profile } from './pages/Profile'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <NavBar/>
        <Routes>      
          <Route path="/JobBoard"  element={<JobBoard/>} />
          <Route path="/Profile"  element={<Profile/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;