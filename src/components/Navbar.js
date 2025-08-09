// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#003087' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          NFL GM Simulator
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/roster">Roster</Button>
        <Button color="inherit" component={Link} to="/trade">Trade Center</Button>
        <Button color="inherit" component={Link} to="/draft">Draft</Button>
        <Button color="inherit" component={Link} to="/free-agency">Free Agency</Button>
        <Button color="inherit" component={Link} to="/season">Season</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
