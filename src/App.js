import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RosterPage from './components/RosterPage';
import StatsPage from './components/StatsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/stats" element={<StatsPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
