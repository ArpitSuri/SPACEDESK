import { useState } from 'react'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Mission from './pages/Missions';
import WeatherForcast from './pages/PlanetWetherForcast';
import TelemetryDashboard from './pages/Telemetry';
import AiAnomoly from './pages/AiAbamoly';
import CosmosAnomalyDashboard from './pages/AiAbamoly';
import GlobleWitheSatellite from './pages/GlobeWithSatellite';



const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className=" flex-1 overflow-y-auto h-screen ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path ="/missions" element ={<Mission />} />
            <Route path="/weather" element={<WeatherForcast />} />
            <Route path ="/telemetry" element={<TelemetryDashboard />}/>
            <Route path="/ai-anamoly" element={<CosmosAnomalyDashboard />} />
            <Route path="/satellites" element={<GlobleWitheSatellite />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;