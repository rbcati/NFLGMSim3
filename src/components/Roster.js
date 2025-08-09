// src/components/Roster.js
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'position', headerName: 'Position', width: 100 },
  { field: 'rating', headerName: 'Rating', width: 100 },
  { field: 'salary', headerName: 'Salary', width: 150, valueFormatter: ({ value }) => `$${value.toLocaleString()}` },
];

const Roster = () => {
  const rows = JSON.parse(localStorage.getItem('yourTeam') || '[]');
  return (
    <div style={{ height: 400, width: '100%', padding: 16 }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};
// src/components/Roster.js

import React, { useState, useEffect } from 'react';
// 👇 1. Import Link!
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function Roster() {
  const [players, setPlayers] = useState([]); // Assuming you fetch players

  // Your useEffect to fetch players would go here...
  // useEffect(() => { ... fetch players and setPlayers(data) ... }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" style={{ padding: '16px' }}>Team Roster</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            {/* Other headers */}
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                {/* 👇 2. THE FIX! Wrap the player's name in a Link.
                  The `player.id` should be the unique ID for each player from your data.
                */}
                <Link to={`/player/${player.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {player.name}
                </Link>
              </TableCell>
              <TableCell>{player.position}</TableCell>
              {/* Other player data cells */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Roster;

{players.map((player) => {
  console.log('Checking player object:', player); // <-- ADD THIS LINE
  return (
    <TableRow key={player.id}>
      {/* ... your code */}
    </TableRow>
  )
})}
