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
// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Roster from './components/Roster';
import TradeCenter from './components/TradeCenter';
import Draft from './components/Draft';
import FreeAgency from './components/FreeAgency';
import Season from './components/Season';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/trade" element={<TradeCenter />} />
        <Route path="/draft" element={<Draft />} />
        <Route path="/free-agency" element={<FreeAgency />} />
        <Route path="/season" element={<Season />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// src/App.js
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Toggle to 'dark' for dark mode
    primary: { main: '#003087' },
    secondary: { main: '#d50a0a' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>{/* Routes */}</Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
