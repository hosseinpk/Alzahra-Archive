import React, { useState } from 'react';

import { TextField, Button, Container, Typography } from '@mui/material';


import { UserContext } from '../components/layout/context';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const context = React.useContext(UserContext);

  return (
    <Container maxWidth="xs" sx={{
      marginTop:4,
      padding: 2 
    }} >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={async (e) => {
    e.preventDefault();  // Prevent form from submitting and refreshing the page
    try {
        await context.handleLogin(email, password);
        // You can add additional actions after successful login
    } catch (error) {
        console.error("Login failed", error);
        setError(true)
        // Handle the error, e.g., show a message to the user
    }
}}>
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
