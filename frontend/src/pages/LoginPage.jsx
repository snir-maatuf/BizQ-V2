import React, { useState } from 'react';
import {
  Typography,
  Stack,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import FrostedBackground from '../features/Generics/FrostedBackground';
import { authenticateUser } from '../api/LoginApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authenticateUser(email, password);

      if (!response.success) {
        alert(response.message);
        return;
      }
      window.location.href = '/SchedulerPage';
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack alignItems='center' justifyContent='center' sx={{ height: '80vh' }}>
      <FrostedBackground>
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{ height: '100%' }}
        >
          <Typography variant='h3' gutterBottom>
          Business owner login
          </Typography>

          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              {/* Email Input */}
              <TextField
                label='Email'
                variant='outlined'
                fullWidth
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* Password Input */}
              <TextField
                label='Password'
                variant='outlined'
                fullWidth
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Submit Button */}
              <Button
                variant='contained'
                type='submit'
                sx={{ backgroundColor: 'black', borderRadius: '30px' }}
              >
                {isLoading ? (
                  <CircularProgress
                    size={24}
                    sx={{ color: 'white' }}
                  ></CircularProgress>
                ) : (
                  <Typography variant='h5' sx={{ textTransform: 'none' }}>Log In</Typography>
                )}
              </Button>
            </Stack>
          </form>
        </Stack>
      </FrostedBackground>
    </Stack>
  );
};

export default LoginPage;
