// src/components/RosterPage.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import mockPlayers from '../data/mockPlayers.json'; // Mock data for testing

const RosterPage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        // Option 1: Use real API (uncomment to use ESPN API)
        /*
        const response = await axios.get(
          'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/1/athletes'
        );
        const formattedPlayers = response.data.athletes.map(player => ({
          id: player.id,
          name: player.fullName,
          position: player.position.abbreviation,
          overall: Math.floor(Math.random() * 20) + 80, // Placeholder for rating
          age: player.age || Math.floor(Math.random() * 10) + 22,
        }));
        setPlayers(formattedPlayers);
        */

        // Option 2: Use mock data
        setPlayers(mockPlayers);
      } catch (error) {
        console.error('Error fetching roster:', error);
        message.error('Failed to load roster. Using mock data.');
        setPlayers(mockPlayers); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      sorter: (a, b) => a.position.localeCompare(b.position),
    },
    {
      title: 'Overall',
      dataIndex: 'overall',
      sorter: (a, b) => a.overall - b.overall,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Button onClick={() => handleTrade(record)}>Trade</Button>
      ),
    },
  ];

  const handleTrade = (player) => {
    // Placeholder for trade logic
    message.info(`Initiating trade for ${player.name}`);
    // TODO: Implement trade modal or redirect to trade page
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Team Roster</h1>
      <Table
        columns={columns}
        dataSource={players}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default RosterPage;
