import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png'; 
import { UserContext } from '../components/layout/context';

const Header = () => {
  const navigate = useNavigate();
  const context = React.useContext(UserContext);
  const isLoggedIn = context.accessToken == null ? false: true ;  // Check if the user is logged in


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
              {context.username}
            </Button>
          )}
          {/* Show Login/Logout Button */}
          <Button color="inherit" onClick={isLoggedIn ? context.handleLogout : () => navigate('/login')}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
