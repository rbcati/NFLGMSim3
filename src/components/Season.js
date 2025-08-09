// src/components/Season.js (or any component)
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Season = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 16 }}>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        Back
      </Button>
      {/* Season content */}
    </div>
  );
};
