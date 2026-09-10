import React from 'react';
import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import { logOut, useIsLoggedIn } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';

export default function NavBar() {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();

  const goHome = () => navigate('/');

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: tokens.paper,
        color: tokens.ink,
        borderBottom: `1px solid ${tokens.line}`,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1.5,
          width: '100%',
          minHeight: { xs: 60, sm: 64 },
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Typography
          component="button"
          onClick={goHome}
          aria-label="BizQ - home"
          sx={{
            border: 0,
            background: 'none',
            cursor: 'pointer',
            p: 0,
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: 21,
            letterSpacing: '-0.02em',
            color: tokens.ink,
            '& b': { color: tokens.green },
          }}
        >
          Biz<b>Q</b>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.75, sm: 1.5 }, flexShrink: 0 }}>
          {isLoggedIn ? (
            <>
              <Button
                onClick={() => navigate('/SchedulerPage')}
                variant="outlined"
                color="primary"
                sx={{ borderRadius: tokens.radius.pill, px: { xs: 1.75, sm: 2.25 }, whiteSpace: 'nowrap' }}
              >
                My business
              </Button>
              <Button
                onClick={logOut}
                variant="contained"
                color="primary"
                sx={{ borderRadius: tokens.radius.pill, px: { xs: 1.75, sm: 2.25 }, whiteSpace: 'nowrap' }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  color: tokens.muted,
                  px: { xs: 1, sm: 1.5 },
                  whiteSpace: 'nowrap',
                  '&:hover': { color: tokens.ink, background: 'transparent' },
                }}
              >
                Business log in
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                variant="contained"
                color="primary"
                sx={{ borderRadius: tokens.radius.pill, px: { xs: 1.75, sm: 2.5 }, whiteSpace: 'nowrap' }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>List your business</Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>List business</Box>
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
