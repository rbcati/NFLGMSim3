// src/components/TradeCenter.js
import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, Button, Typography } from '@mui/material';

const TradeCenter = () => {
  const [yourTeam, setYourTeam] = useState([]);
  const [otherTeam, setOtherTeam] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [salaryCap, setSalaryCap] = useState(255000000); // 2025 NFL cap

  useEffect(() => {
    // Replace with API call or load from local storage
    const mockData = {
      yourTeam: [
        { id: 1, name: 'Patrick Mahomes', position: 'QB', rating: 99, salary: 45000000 },
        { id: 2, name: 'Travis Kelce', position: 'TE', rating: 94, salary: 17000000 },
      ],
      otherTeam: [
        { id: 3, name: 'Aaron Rodgers', position: 'QB', rating: 92, salary: 37000000 },
        { id: 4, name: 'Davante Adams', position: 'WR', rating: 95, salary: 28000000 },
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
    const yourTeamSalary = selectedPlayers
      .filter((p) => yourTeam.includes(p))
      .reduce((sum, p) => sum + (p.salary || 0), 0);
    const otherTeamSalary = selectedPlayers
      .filter((p) => otherTeam.includes(p))
      .reduce((sum, p) => sum + (p.salary || 0), 0);
    const capAfterTrade = salaryCap + yourTeamSalary - otherTeamSalary;
    if (capAfterTrade < 0) {
      alert('Trade exceeds salary cap!');
      return;
    }
    // Update rosters
    setYourTeam((prev) => [
      ...prev.filter((p) => !selectedPlayers.includes(p)),
      ...selectedPlayers.filter((p) => otherTeam.includes(p)),
    ]);
    setOtherTeam((prev) => [
      ...prev.filter((p) => !selectedPlayers.includes(p)),
      ...selectedPlayers.filter((p) => yourTeam.includes(p)),
    ]);
    setSalaryCap(capAfterTrade);
    setSelectedPlayers([]);
    alert('Trade completed!');
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Trade Center</Typography>
        <Typography>Salary Cap: ${salaryCap.toLocaleString()}</Typography>
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
              {player.name} ({player.position}, Rating: {player.rating}, Salary: ${player.salary.toLocaleString()})
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
              {player.name} ({player.position}, Rating: {player.rating}, Salary: ${player.salary.toLocaleString()})
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
