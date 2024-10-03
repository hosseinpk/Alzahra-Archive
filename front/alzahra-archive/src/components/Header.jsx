import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png'; 

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('http://127.0.0.1:8000/accounts/api/v1/logout/', { method: 'POST' }); // Call the logout API
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('accessToken'); 

  return (
    <AppBar position="static">
      <Container maxWidth={false} sx={{ padding: 0 }}>
        <Toolbar>
          {/* Logo and Title Container */}
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="Logo" style={{ marginRight: 8, maxWidth: '55px' }} />
            <Typography variant="h6" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
              Alzahra Archive
            </Typography>
          </Box>
          
          
         
          <Button color="inherit" onClick={isLoggedIn ? handleLogout : () => navigate('/login')}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
