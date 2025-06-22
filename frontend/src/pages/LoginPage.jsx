import React, { useState } from 'react';
import {
  Typography,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Box,
  InputAdornment,
} from '@mui/material';
import FrostedBackground from '../features/Generics/FrostedBackground';
import { authenticateUser } from '../api/LoginApi';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '80vh',
        width: '100%',
        background: 'none', // gradient already on main bg
      }}
    >
        <Paper
          elevation={7}
          sx={{
            px: { xs: 3, sm: 7 },
            py: { xs: 4, sm: 6 },
            borderRadius: '24px',
            maxWidth: 410,
            width: '100%',
            bgcolor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 30px #b7b6f229',
          }}
        >
          <Stack spacing={4} alignItems="center">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: '.03em',
                background: 'linear-gradient(90deg,#667eea,#764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                textAlign: 'center',
              }}
              gutterBottom
            >
              Business Owner Login
            </Typography>

            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <Stack spacing={2.6}>
                {/* Email */}
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  required
                  value={email}
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { bgcolor: '#f5f7fa', borderRadius: 2 },
                  }}
                />
                {/* Password */}
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  value={password}
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { bgcolor: '#f5f7fa', borderRadius: 2 },
                  }}
                />

                {/* Log In Button */}
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{
                    mt: 1,
                    px: 0,
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontSize: '1.12rem',
                    background: 'linear-gradient(90deg,#667eea,#764ba2)',
                    boxShadow: '0 4px 18px 0 #667eea20',
                    textTransform: 'none',
                    transition: 'all 0.18s',
                    '&:hover': {
                      background: 'linear-gradient(90deg,#764ba2 65%,#667eea 100%)',
                      boxShadow: '0 6px 24px #667eea26',
                      transform: 'translateY(-1.5px) scale(1.025)',
                    },
                  }}
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={26} sx={{ color: 'white' }} />
                  ) : (
                    'Log In'
                  )}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>

    </Stack>
  );
};

export default LoginPage;
