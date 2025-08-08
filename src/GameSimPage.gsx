// src/components/GameSimPage.jsx
import React, { useState } from 'react';
import { Button, Select, message, List, Typography } from 'antd';
import { simulateGame } from '../engine/SimulationEngine';
import mockPlayers from '../data/mockPlayers.json';

const { Option } = Select;
const { Title, Text } = Typography;

const GameSimPage = () => {
  const [team1Id, setTeam1Id] = useState(null);
  const [team2Id, setTeam2Id] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [week, setWeek] = useState(1);

  // Mock teams (extend with real team data if available)
  const teams = [
    { id: 1, name: 'Team A', players: mockPlayers.slice(0, 2) }, // Example: First 2 players
    { id: 2, name: 'Team B', players: mockPlayers.slice(2, 4) }, // Last 2 players
  ];

  const handleSimulate = () => {
    if (!team1Id || !team2Id) {
      message.error('Please select both teams');
      return;
    }

    const team1 = teams.find(t => t.id === team1Id).players;
    const team2 = teams.find(t => t.id === team2Id).players;
    const result = simulateGame(team1, team2, week);

    // Update mockPlayers.json (in a real app, save to a database or file)
    // For simplicity, store result in state
    setGameResult(result);
    setWeek(week + 1); // Increment week for next simulation

    // Note: To persist stats, you’d need to update mockPlayers.json or a backend
    message.success('Game simulated! Check the stats page for updated stats.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Game Simulation</Title>
      <div style={{ marginBottom: '20px' }}>
        <Text>Select Team 1: </Text>
        <Select
          style={{ width: 200, marginRight: 10 }}
          onChange={setTeam1Id}
          placeholder="Choose Team 1"
        >
          {teams.map(team => (
            <Option key={team.id} value={team.id}>
              {team.name}
            </Option>
          ))}
        </Select>
        <Text>Select Team 2: </Text>
        <Select
          style={{ width: 200, marginRight: 10 }}
          onChange={setTeam2Id}
          placeholder="Choose Team 2"
        >
          {teams.map(team => (
            <Option key={team.id} value={team.id}>
              {team.name}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleSimulate}>
          Simulate Game
        </Button>
      </div>
      {gameResult && (
        <div>
          <Title level={3}>
            Result: {teams.find(t => t.id === team1Id).name} {gameResult.team1Score} -{' '}
            {gameResult.team2Score} {teams.find(t => t.id === team2Id).name}
          </Title>
          <Title level={4}>Play-by-Play</Title>
          <List
            dataSource={gameResult.playByPlay}
            renderItem={play => (
              <List.Item>
                <Text>{play.description}</Text>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default GameSimPage;
