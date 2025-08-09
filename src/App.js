// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Roster from './components/Roster';
import TradeCenter from './components/TradeCenter';
import Draft from './components/Draft';
import FreeAgency from './components/FreeAgency';
import Season from './components/Season';

// Define NFL-themed styles
const theme = createTheme({
  palette: {
    mode: 'light', // Toggle to 'dark' for dark mode
    primary: { main: '#003087' }, // NFL blue
    secondary: { main: '#d50a0a' }, // NFL red
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar /> {/* Render navigation menu */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/trade" element={<TradeCenter />} />
          <Route path="/draft" element={<Draft />} /> {/* Route for Draft */}
          <Route path="/free-agency" element={<FreeAgency />} />
          <Route path="/season" element={<Season />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
