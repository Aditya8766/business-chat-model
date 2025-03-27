import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const SignIn = () => {
  const API_BASE_URL = "https://business-chat-model-server.vercel.app";
  // const API_BASE_URL = "http://localhost:3000"; //for local
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 


  const handleSignIn = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Sign-in successful!');
        navigate('/dashboard');
      } else {
        setErrorMessage(result.error || 'Error signing in');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage('Error signing in');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Box
        p={4}
        bgcolor="#fff"
        boxShadow={3}
        borderRadius={4}
        width="400px"
        textAlign="center"
      >
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>

        <form onSubmit={handleSignIn}>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate('/signup')}
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>

        {errorMessage && (
          <Typography color="error" mt={2}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SignIn;
