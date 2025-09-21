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
          <h1>Welcome to Dragond!</h1>
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

/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/

