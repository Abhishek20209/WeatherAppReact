import './App.css';
import {Route,Routes,useNavigate} from 'react-router-dom';  
import Home from './components/Home';
import Search from './components/Search';
import Navbar from './components/Navbar';
import { useState } from 'react';


function App() {
  
  const [atHome,setAtHome]=useState(true);
  
  return (
    <div>
      
      <Navbar atHome={atHome}  setAtHome={setAtHome} />

      <Routes>

        <Route path="/" element={<Home/>} />

        <Route path="/Search" element={<Search/>} />

      </Routes>
      
    </div>
  );
}

export default App;
