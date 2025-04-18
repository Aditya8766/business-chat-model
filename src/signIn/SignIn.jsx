import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const SignIn = () => {
  const API_BASE_URL = "https://business-chat-model-server.vercel.app";
  // const API_BASE_URL = "http://localhost:3000";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Sign-in successful!');
        navigate('/dashboard');
      } else {
        setErrorMessage(result.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
  
    try {
      const decoded = jwtDecode(token);
      console.log('Google User:', decoded);
  
      alert('Google Sign-in successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to decode Google token:', err);
      setErrorMessage('Google Sign-in failed');
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Box p={4} bgcolor="#fff" boxShadow={3} borderRadius={4} width="400px" textAlign="center">
        <Typography variant="h5" gutterBottom>Sign In</Typography>

        <form onSubmit={handleSignIn}>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage('');
            }}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage('');
            }}
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
            sx={{ mt: 1 }}
          >
            Don't have an account? Sign up
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess }
          onError={() => setErrorMessage('Google Sign-in failed')}
        />

        {errorMessage && (
          <Typography color="error" mt={2}>{errorMessage}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SignIn;
