// src/components/Season.js
import React, { useState, useEffect } from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const Season = () => {
  const [seasonResults, setSeasonResults] = useState(null);
  const [awards, setAwards] = useState([]);

  const simulateSeason = () => {
    // Mock team data
    const teams = [
      { id: 1, name: 'Chiefs', rating: 95 },
      { id: 2, name: 'Eagles', rating: 92 },
      // Add all 32 NFL teams
    ];

    // Simulate regular season (17 games per team)
    const games = [];
    for (let week = 1; week <= 17; week++) {
      // Pair teams randomly or use a schedule
      const game = {
        week,
        homeTeam: teams[0],
        awayTeam: teams[1],
        winner: Math.random() < teams[0].rating / (teams[0].rating + teams[1].rating) ? teams[0] : teams[1],
      };
      games.push(game);
    }

    // Simulate playoffs
    const playoffTeams = teams.sort((a, b) => b.rating - a.rating).slice(0, 14); // Top 14 teams
    const superBowl = {
      teams: [playoffTeams[0], playoffTeams[1]],
      winner: Math.random() < 0.5 ? playoffTeams[0] : playoffTeams[1],
    };

    // Simulate awards (e.g., MVP, DPOY)
    const mockAwards = [
      { award: 'MVP', player: 'Patrick Mahomes', team: 'Chiefs' },
      { award: 'DPOY', player: 'Micah Parsons', team: 'Cowboys' },
    ];

    setSeasonResults({ games, superBowl });
    setAwards(mockAwards);
  };

  return (
    <div style={{ padding: 16 }}>
      <Typography variant="h4">Season Simulator</Typography>
      <Button variant="contained" onClick={simulateSeason}>
        Simulate Season
      </Button>
      {seasonResults && (
        <>
          <Typography variant="h5" style={{ marginTop: 16 }}>
            Super Bowl: {seasonResults.superBowl.winner.name} won!
          </Typography>
          <Typography variant="h6">Awards</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Award</TableCell>
                <TableCell>Player</TableCell>
                <TableCell>Team</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {awards.map((award, index) => (
                <TableRow key={index}>
                  <TableCell>{award.award}</TableCell>
                  <TableCell>{award.player}</TableCell>
                  <TableCell>{award.team}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Season;
