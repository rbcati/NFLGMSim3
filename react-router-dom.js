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

// src/components/Season.js (or any component)
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Season = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        Back
      </Button>
      {/* Season content */}
    </div>
  );
};
