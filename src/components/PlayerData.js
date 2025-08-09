// src/components/PlayerData.js

import React, { useState, useEffect } from 'react';
// 👇 1. Import the useParams hook
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

// Assuming you have access to all players data here or can fetch it
// For a real app, you might have a global context or fetch from an API
import allPlayers from '../data/allPlayers'; // Example: import your players data

function PlayerData() {
  // 👇 2. Use useParams to get the ID from the URL
  // The 'id' here MUST match the `:id` in your Route path in App.js
  const { id } = useParams(); 
  
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // 👇 3. Find the player with the matching ID
    const currentPlayer = allPlayers.find(p => p.id === parseInt(id)); // Use parseInt if ID is a number
    setPlayer(currentPlayer);
  }, [id]); // Re-run this effect if the ID in the URL changes

  // If the player isn't found yet, show a loading message
  if (!player) {
    return <Typography>Loading player data...</Typography>;
  }

  // 👇 4. Display the found player's data
  return (
    <Card>
      <CardContent>
        <Typography variant="h3">{player.name}</Typography>
        <Typography variant="h5">Position: {player.position}</Typography>
        <Typography>Overall: {player.overall}</Typography>
        {/* Display all other player stats here */}
      </CardContent>
    </Card>
  );
}

export default PlayerData;
import { useParams } from 'react-router-dom';

function PlayerData() {
  const { id } = useParams();
  console.log('ID from URL:', id); // <-- ADD THIS LINE
  // ... rest of the component
}
