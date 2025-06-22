import React from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { logOut, useIsLoggedIn } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const handleAuthClick = () => isLoggedIn ? logOut() : navigate('/signup');
  const handleHomeClick = () => navigate('/');
  const handleNextClick = () => navigate(isLoggedIn ? '/SchedulerPage' : '/login');

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          mx: 'auto',
          width: '100%',
        }}
      >
        {/* Left: Home & Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleHomeClick}
            sx={{
              mr: 1,
              p: 1,
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              color: '#fff',
              '&:hover': { background: 'linear-gradient(90deg, #5a67d8, #6b46c1)' },
            }}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            onClick={handleHomeClick}
            sx={{ cursor: 'pointer', fontWeight: 700, color: '#333' }}
          >
            BizQ
          </Typography>
        </Box>

        {/* Right: Actions */}
        <Box>
          {isLoggedIn ? (
            <>
              <Button
                onClick={handleNextClick}
                startIcon={<BusinessCenterIcon />}
                sx={{
                  mr: 2,
                  textTransform: 'none',
                  color: '#667eea',
                  border: '1px solid #667eea',
                  borderRadius: '20px',
                  px: 2,
                  '&:hover': { background: 'rgba(102,126,234,0.1)' },
                }}
              >
                My Business
              </Button>
              <Button
                onClick={handleAuthClick}
                startIcon={<LogoutIcon />}
                sx={{
                  textTransform: 'none',
                  borderRadius: '20px',
                  background: 'linear-gradient(90deg, #667eea, #764ba2)',
                  color: '#fff',
                  px: 2,
                  '&:hover': { background: 'linear-gradient(90deg, #5a67d8, #6b46c1)' },
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate('/login')}
                startIcon={<LoginIcon />}
                sx={{
                  mr: 2,
                  textTransform: 'none',
                  color: '#667eea',
                  '&:hover': { background: 'rgba(102,126,234,0.1)' },
                }}
              >
                Log in
              </Button>
              <Button
                onClick={handleAuthClick}
                sx={{
                  textTransform: 'none',
                  borderRadius: '20px',
                  background: 'linear-gradient(90deg, #667eea, #764ba2)',
                  color: '#fff',
                  px: 2,
                  '&:hover': { background: 'linear-gradient(90deg, #5a67d8, #6b46c1)' },
                }}
              >
                Sign up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
