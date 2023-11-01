import './App.css';
import { NavBar } from './components/NavBar'
import { JobBoard } from './pages/JobBoard'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <NavBar/>
        <Routes>      
          <Route path="/JobBoard"  element={<JobBoard/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;