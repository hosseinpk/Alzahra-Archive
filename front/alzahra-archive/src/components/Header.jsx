import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Redirect to login page
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('accessToken'); // Check if the user is logged in

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Archive Management
          </Typography>
          {/* Home Button */}
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          {/* Add File Button */}
          <Button color="inherit" onClick={() => navigate('/addfile')}>
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
