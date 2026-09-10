import React, { useState } from 'react';
import {
  Typography,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Paper,
  InputAdornment,
} from '@mui/material';
import FrostedBackground from '../features/Generics/FrostedBackground';
import { authenticateUser } from '../api/LoginApi';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { tokens } from '../theme';

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
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '80vh', width: '100%' }}>
      <Paper
        elevation={0}
        sx={{
          px: { xs: 3, sm: 6 },
          py: { xs: 4, sm: 6 },
          borderRadius: tokens.radius.lg,
          maxWidth: 420,
          width: '100%',
          border: `1px solid ${tokens.line}`,
          boxShadow: '0 1px 2px rgba(20,18,12,0.04), 0 12px 32px rgba(20,18,12,0.06)',
        }}
      >
        <Stack spacing={3.5}>
          <Stack spacing={0.75}>
            <Typography variant="h4" sx={{ fontSize: { xs: 24, sm: 28 } }}>
              Business log in
            </Typography>
            <Typography sx={{ fontSize: 14.5, color: tokens.muted }}>
              Sign in to manage your business and its calendar.
            </Typography>
          </Stack>

          <form onSubmit={handleLogin}>
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                type="email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                  sx: { bgcolor: tokens.fieldFill },
                }}
              />
              <TextField
                label="Password"
                type="password"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                  sx: { bgcolor: tokens.fieldFill },
                }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{ mt: 0.5, py: 1.25, borderRadius: tokens.radius.md, fontSize: 15 }}
              >
                {isLoading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Log in'}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default LoginPage;
