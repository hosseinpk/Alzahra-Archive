import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('accessToken'); 

  return (
    <AppBar position="static">
      <Container maxWidth={false} sx={{ padding: 0 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Alzahra Archive
          </Typography>
          {/* Home Button */}
          <Button color="inherit" onClick={() => navigate('/home')} sx={{ marginRight: 2 }}>
            Home
          </Button>
          {/* Add File Button */}
          <Button color="inherit" onClick={() => navigate('/addfile')} sx={{ marginRight: 2 }}>
            Add File
          </Button>
          {/* Login/Logout Button */}
          <Button color="inherit" onClick={isLoggedIn ? handleLogout : () => navigate('/login')}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
