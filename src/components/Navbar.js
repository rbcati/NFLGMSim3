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

// src/components/Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [open, setOpen] = useState(false); // For mobile drawer

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#003087' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(true)} sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            NFL GM Simulator
          </Typography>
          {/* Desktop links */}
          <Button color="inherit" component={Link} to="/" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/roster" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Roster
          </Button>
          <Button color="inherit" component={Link} to="/trade" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Trade Center
          </Button>
          <Button color="inherit" component={Link} to="/draft" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Draft
          </Button>
          <Button color="inherit" component={Link} to="/free-agency" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Free Agency
          </Button>
          <Button color="inherit" component={Link} to="/season" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Season
          </Button>
        </Toolbar>
      </AppBar>
      {/* Mobile drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem button component={Link} to="/" onClick={() => setOpen(false)}>
            Home
          </ListItem>
          <ListItem button component={Link} to="/roster" onClick={() => setOpen(false)}>
            Roster
          </ListItem>
          <ListItem button component={Link} to="/trade" onClick={() => setOpen(false)}>
            Trade Center
          </ListItem>
          <ListItem button component={Link} to="/draft" onClick={() => setOpen(false)}>
            Draft
          </ListItem>
          <ListItem button component={Link} to="/free-agency" onClick={() => setOpen(false)}>
            Free Agency
          </ListItem>
          <ListItem button component={Link} to="/season" onClick={() => setOpen(false)}>
            Season
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
// src/components/Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#003087' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(true)} sx={{ display: { xs: 'block', sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            NFL GM Simulator
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/roster" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Roster
          </Button>
          <Button color="inherit" component={Link} to="/trade" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Trade Center
          </Button>
          <Button color="inherit" component={Link} to="/draft" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Draft
          </Button>
          <Button color="inherit" component={Link} to="/free-agency" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Free Agency
          </Button>
          <Button color="inherit" component={Link} to="/season" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Season
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem button component={Link} to="/" onClick={() => setOpen(false)}>Home</ListItem>
          <ListItem button component={Link} to="/roster" onClick={() => setOpen(false)}>Roster</ListItem>
          <ListItem button component={Link} to="/trade" onClick={() => setOpen(false)}>Trade Center</ListItem>
          <ListItem button component={Link} to="/draft" onClick={() => setOpen(false)}>Draft</ListItem>
          <ListItem button component={Link} to="/free-agency" onClick={() => setOpen(false)}>Free Agency</ListItem>
          <ListItem button component={Link} to="/season" onClick={() => setOpen(false)}>Season</ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
// src/components/Navbar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// 👇 1. Make sure you import Link from react-router-dom
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          NFL GM Simulator
        </Typography>

        {/* 👇 2. This is the magic combo for the Home button */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        
        {/* You can do the same for other links, like Roster */}
        <Button color="inherit" component={Link} to="/roster">
          Roster
        </Button>
        
        {/* Add other nav buttons here... */}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

