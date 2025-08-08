// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RosterPage from './components/RosterPage';
import StatsPage from './components/StatsPage';
import GameSimPage from './components/GameSimPage';

const HomePage = () => <div style={{ padding: '20px' }}><h1>Welcome to NFL GM Simulator</h1></div>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/simulate" element={<GameSimPage />} />
      </Routes>
    </Router>
  );
}

export default App;
