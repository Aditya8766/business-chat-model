import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Box, Button, TextField, Typography } from '@mui/material';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const sendSignupRequest = async () => {
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, phoneNumber }),
      });

      if (!response.ok) throw new Error('Failed to send OTP');

      setOtpSent(true);
    } catch (error) {
      console.error('Signup Error:', error);
      setErrorMessage('Signup failed. Please try again.');
    }
  };

  const verifyOtpRequest = async () => {
    try {
      const response = await fetch('http://localhost:3000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (data.message === 'OTP verified successfully.') {
        alert('Signup successful!');
        navigate('/signin');
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Verification failed. Please try again.');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Box p={4} bgcolor="#fff" boxShadow={3} borderRadius={4} width="400px" textAlign="center">
        {otpSent ? (
          <>
            <Typography variant="h5" gutterBottom>
              Enter OTP
            </Typography>
            <TextField
              type="text"
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={verifyOtpRequest}
              disabled={otp.length !== 6}
              sx={{ mt: 2 }}
            >
              Verify OTP
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Signup
            </Typography>
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
            <Box mt={2} mb={2}>
              <PhoneInput
                international
                defaultCountry="IN"
                value={phoneNumber}
                onChange={setPhoneNumber}
                required
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={sendSignupRequest}
              sx={{ mt: 2 }}
            >
              Signup
            </Button>
            <Button variant="text" fullWidth onClick={() => navigate('/signin')} sx={{ mt: 2 }}>
              Already have an account? Sign in
            </Button>
          </>
        )}

        {errorMessage && (
          <Typography color="error" mt={2}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SignupPage;
