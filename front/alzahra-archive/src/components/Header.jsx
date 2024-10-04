import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import logo from '../../assets/Logo.png'; 

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken'); // Get refresh token from local storage
    const accessToken = localStorage.getItem('accessToken'); // Get access token from local storage

    try {
      const response = await axios.post('http://127.0.0.1:8000/accounts/api/v1/logout/', 
        { refresh: refreshToken },  // Send refresh token in the body
        {
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
            'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
          },
        }
      );

      if (response.status === 204) {
        // If the logout is successful, clear local storage and redirect to login page
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('is_staff');
        localStorage.removeItem('username');
        navigate('/login');
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const isLoggedIn = !!localStorage.getItem('accessToken');  // Check if the user is logged in
  const username = localStorage.getItem('username');  // Get the username from localStorage

  return (
    <AppBar position="static">
      <Container maxWidth={false} sx={{ padding: 0 }}>
        <Toolbar>
          {/* Logo and Title Container */}
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="Logo" style={{ marginRight: 8, maxWidth: '55px' }} />
            <Typography 
              variant="h6" 
              onClick={() => navigate('/home')} 
              style={{ cursor: 'pointer' }}
            >
              Alzahra Archive
            </Typography>
          </Box>
          {/* Show Username if Logged In */}
          {isLoggedIn && (
            <Button color="inherit">
              {username}
            </Button>
          )}
          {/* Show Login/Logout Button */}
          <Button color="inherit" onClick={isLoggedIn ? handleLogout : () => navigate('/login')}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
