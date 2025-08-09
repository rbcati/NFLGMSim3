// src/components/Draft.js
import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, Button, Typography } from '@mui/material';

const Draft = () => {
  const [draftProspects, setDraftProspects] = useState([]);
  const [currentPick, setCurrentPick] = useState(1);
  const [yourTeam, setYourTeam] = useState([]);

  useEffect(() => {
    // Mock draft prospects
    const prospects = [
      { id: 1, name: 'John Doe', position: 'QB', rating: 88 },
      { id: 2, name: 'Jane Smith', position: 'WR', rating: 85 },
    ];
    setDraftProspects(prospects);
  }, []);

  const draftPlayer = (player) => {
    setYourTeam([...yourTeam, player]);
    setDraftProspects((prev) => prev.filter((p) => p.id !== player.id));
    setCurrentPick((prev) => prev + 1);
    alert(`Drafted ${player.name}!`);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4">NFL Draft</Typography>
        <Typography>Current Pick: {currentPick}</Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          {draftProspects.map((player) => (
            <ListItem key={player.id}>
              {player.name} ({player.position}, Rating: {player.rating})
              <Button variant="contained" onClick={() => draftPlayer(player)} sx={{ ml: 2 }}>
                Draft
              </Button>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Draft;
