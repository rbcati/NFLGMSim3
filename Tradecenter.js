// src/components/TradeCenter.js
import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, Button, Typography } from '@mui/material';

const TradeCenter = () => {
  const [yourTeam, setYourTeam] = useState([]);
  const [otherTeam, setOtherTeam] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    // Mock data or fetch from API
    const mockData = {
      yourTeam: [
        { id: 1, name: 'Patrick Mahomes', position: 'QB', rating: 99 },
        { id: 2, name: 'Travis Kelce', position: 'TE', rating: 94 },
      ],
      otherTeam: [
        { id: 3, name: 'Aaron Rodgers', position: 'QB', rating: 92 },
        { id: 4, name: 'Davante Adams', position: 'WR', rating: 95 },
      ],
    };
    setYourTeam(mockData.yourTeam);
    setOtherTeam(mockData.otherTeam);
  }, []);

  const handleSelectPlayer = (player) => {
    setSelectedPlayers((prev) =>
      prev.includes(player) ? prev.filter((p) => p.id !== player.id) : [...prev, player]
    );
  };

  const handleTrade = () => {
    // Validate trade (e.g., salary cap, roster limits)
    if (selectedPlayers.length === 0) {
      alert('Select at least one player to trade.');
      return;
    }
    // Send trade to backend or update local state
    console.log('Trade proposed:', selectedPlayers);
    alert('Trade proposed successfully!');
    setSelectedPlayers([]);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Trade Center</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">Your Team</Typography>
        <List>
          {yourTeam.map((player) => (
            <ListItem key={player.id}>
              <input
                type="checkbox"
                checked={selectedPlayers.includes(player)}
                onChange={() => handleSelectPlayer(player)}
              />
              {player.name} ({player.position}, Rating: {player.rating})
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">Other Team</Typography>
        <List>
          {otherTeam.map((player) => (
            <ListItem key={player.id}>
              <input
                type="checkbox"
                checked={selectedPlayers.includes(player)}
                onChange={() => handleSelectPlayer(player)}
              />
              {player.name} ({player.position}, Rating: {player.rating})
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleTrade}>
          Propose Trade
        </Button>
      </Grid>
    </Grid>
  );
};

export default TradeCenter;

// Add salary cap check
const handleTrade = () => {
  const totalSalary = selectedPlayers.reduce((sum, player) => sum + (player.salary || 0), 0);
  const salaryCap = 255000000; // 2025 NFL cap (example)
  const currentCapUsed = yourTeam.reduce((sum, player) => sum + (player.salary || 0), 0);
  if (totalSalary + currentCapUsed > salaryCap) {
    alert('Trade exceeds salary cap!');
    return;
  }
  // Process trade
  saveTrade({ players: selectedPlayers, timestamp: new Date() });
  alert('Trade successful!');
};
