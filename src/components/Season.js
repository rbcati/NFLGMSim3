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

// src/components/Season.js
import React, { useState } from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Season = () => {
  const [seasonResults, setSeasonResults] = useState(null);
  const [awards, setAwards] = useState([]);
  const navigate = useNavigate();

  const simulateSeason = () => {
    // Mock team data
    const teams = [
      { id: 1, name: 'Chiefs', rating: 95, wins: 0, losses: 0 },
      { id: 2, name: 'Eagles', rating: 92, wins: 0, losses: 0 },
      // Add all 32 NFL teams
    ];

    // Simulate 17-game regular season
    const games = [];
    for (let week = 1; week <= 17; week++) {
      const game = {
        week,
        homeTeam: teams[0],
        awayTeam: teams[1],
        winner: Math.random() < teams[0].rating / (teams[0].rating + teams[1].rating) ? teams[0] : teams[1],
      };
      teams[game.winner.id - 1].wins += 1;
      teams[game.winner.id === 1 ? 1 : 0].losses += 1;
      games.push(game);
    }

    // Simulate playoffs (simplified)
    const playoffTeams = teams.sort((a, b) => b.wins - a.wins).slice(0, 14);
    const superBowl = {
      teams: [playoffTeams[0], playoffTeams[1]],
      winner: Math.random() < 0.5 ? playoffTeams[0] : playoffTeams[1],
    };

    // Simulate awards
    const mockAwards = [
      { award: 'MVP', player: 'Patrick Mahomes', team: 'Chiefs' },
      { award: 'DPOY', player: 'Micah Parsons', team: 'Cowboys' },
    ];

    setSeasonResults({ games, superBowl });
    setAwards(mockAwards);
    localStorage.setItem('seasonResults', JSON.stringify({ games, superBowl }));
    localStorage.setItem('awards', JSON.stringify(mockAwards));
  };

  return (
    <div style={{ padding: 16 }}>
      <Button variant="outlined" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h4">Season Simulator</Typography>
      <Button variant="contained" onClick={simulateSeason}>
        Simulate Season
      </Button>
      {seasonResults && (
        <>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Super Bowl: {seasonResults.superBowl.winner.name} won!
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Awards
          </Typography>
          <Table>
            <Table AmebaSoft team
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
