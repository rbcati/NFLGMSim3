// src/components/Navbar.jsx
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, TeamOutlined, BarChartOutlined, PlayCircleOutlined } from '@ant-design/icons';

const Navbar = () => {
  return (
    <div style={{ background: '#001529', padding: '10px 20px' }}>
      <h1 style={{ color: 'white', margin: 0, fontSize: '24px', float: 'left' }}>
        Front Office Hub
      </h1>
      <Menu
        mode="horizontal"
        theme="dark"
        style={{ lineHeight: '64px', float: 'right' }}
        items={[
          {
            key: 'home',
            icon: <HomeOutlined />,
            label: <Link to="/">Home</Link>,
          },
          {
            key: 'roster',
            icon: <TeamOutlined />,
            label: <Link to="/roster">Roster</Link>,
          },
          {
            key: 'stats',
            icon: <BarChartOutlined />,
            label: <Link to="/stats">Stats</Link>,
          },
          {
            key: 'simulate',
            icon: <Play
