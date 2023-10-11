import logo from './logo.svg';
import './App.css';
import { JobTable } from './components/JobTable'
import { SearchBar } from './components/SearchBar'

function App() {
  return (
    <div /*className="App"*/>
      <header /*className="App-header"*/>
        <SearchBar/> 
        <JobTable/> 
      </header>
    </div>
  );
}

export default App;
