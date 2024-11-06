import React, { useState } from "react";

import { TextField, Button, Container, Typography } from "@mui/material";

import { UserContext } from "../components/layout/context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const context = React.useContext(UserContext);

  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: 4,
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await context.handleLogin(email, password);
          } catch (error) {
            console.error("Login failed", error);
            setError(error.message);
          }
        }}
      >
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

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
