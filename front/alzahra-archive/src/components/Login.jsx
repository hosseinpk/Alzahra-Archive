import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Ensure useNavigate is imported correctly

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
 
      const response = await axios.post('http://127.0.0.1:8000/accounts/api/v1/login/', {
        email,
        password,
      });
      
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      navigate('/home');
    } catch (error) {
      // Handling login failure
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{
      marginTop:4,
      padding: 2 
    }} >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
