import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import CameraPage from './pages/CameraPage';
import Footer from './components/Footer';
import Gallery from './pages/Gallery';
import { ContextProvider } from './context/Context';
import SaveForm from './pages/SaveForm';
// import Location from './components/location/Location';

function App() {
  return (
    <div className="App">
      <Router>
        <ContextProvider>
          <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/camera" element={<CameraPage/>} />
          <Route path="/SaveForm" element={<SaveForm/>} />
          {/* <Route path="/location" element={<Location/>} /> */}
          </Routes>
        
       
        <Footer />
       </ContextProvider>
      </Router>
    </div>
  );
}

export default App;
