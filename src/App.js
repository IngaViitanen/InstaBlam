import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CameraPage from './pages/CameraPage';
import Gallery from './pages/Gallery';
import { ContextProvider } from './context/Context';

function App() {
  return (
    <div className="App">
        <Router>
            <ContextProvider>
                <Routes>
                    <Route path="/" exact element={<Gallery/>} />
                    <Route path="/camera" element={<CameraPage/>} />
                </Routes>
            </ContextProvider>
      </Router>
    </div>
  );
}

export default App;
