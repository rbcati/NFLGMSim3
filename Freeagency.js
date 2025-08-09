// src/components/FreeAgency.js
import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, Button, Typography } from '@mui/material';

const FreeAgency = () => {
  const [freeAgents, setFreeAgents] = useState([]);
  const [teamCap, setTeamCap] = useState(255000000); // 2025 NFL cap

  useEffect(() => {
    // Mock free agents or fetch from API
    const mockFreeAgents = [
      { id: 1, name: 'Kirk Cousins', position: 'QB', rating: 85, salary: 30000000 },
      { id: 2, name: 'Chris Jones', position: 'DT', rating: 90, salary: 25000000 },
    ];
    setFreeAgents(mockFreeAgents);
  }, []);

  const signPlayer = (player) => {
    if (player.salary > teamCap) {
      alert('Insufficient cap space!');
      return;
    }
    setTeamCap((prev) => prev - player.salary);
    setFreeAgents((prev) => prev.filter((p) => p.id !== player.id));
    alert(`Signed ${player.name}!`);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Free Agency</Typography>
        <Typography>Remaining Cap: ${teamCap.toLocaleString()}</Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          {freeAgents.map((player) => (
            <ListItem key={player.id}>
              {player.name} ({player.position}, Rating: {player.rating}, Salary: ${player.salary.toLocaleString()})
              <Button variant="contained" onClick={() => signPlayer(player)} sx={{ ml: 2 }}>
                Sign
              </Button>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default FreeAgency;
