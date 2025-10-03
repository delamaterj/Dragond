import './App.css';
import Button from './components/Button';
import DnD5e2024 from './DnD5e2024';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.title = "Dragond";
  }, []);
  
  return (

    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {
        <div>
          <div className="header">
            <h1>Welcome to Dragond!</h1>
          </div>
          <p>Here you will be able to generate your own rpg character</p>
          <p>Select which rpg edition you would like to try out and fill out its questionnaires to create your character (or don't and leave it all to chance!)</p>
          <h4>Select an edition to get started</h4>
          <nav>
            <Button title="D&D 5e (2024)" disabled={false} url="/DnD5e2024"/>
            <Button title="D&D 5e (Coming Soon!)" disabled={true} url=""/>
            <Button title="Pathfinder 3.5e (Coming Soon!)" disabled={true} url=""/>
          </nav>
      </div>
      }/>
      <Route path="/DnD5e2024" element={<DnD5e2024/>} />
    </Routes>
    </BrowserRouter>
    </>

  );

}

export default App


