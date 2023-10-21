import './App.css';
import { NavBar } from './components/NavBar'
import { JobBoard } from './components/JobBoard'
import { FilterSection } from './components/FilterSelection'
import { Filter, CheckboxDropdown} from './components/Filter'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <header>
        <NavBar/>
        <Filter/>
        <Routes>      
          <Route path="/JobBoard"  element={<JobBoard/>} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
