import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';

export default function OwnerCta() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        borderRadius: tokens.radius.lg,
        backgroundColor: tokens.ink,
        color: tokens.paper,
        px: { xs: 2.5, md: 3.5 },
        py: { xs: 2, md: 2.25 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h3" sx={{ fontSize: { xs: 17, md: 20 }, color: tokens.paper, mb: 0.5 }}>
          Run a business that takes appointments?
        </Typography>
        <Typography sx={{ fontSize: 13.5, color: 'rgba(255,255,255,0.72)', maxWidth: '48ch' }}>
          List it on BizQ, set your hours once, and let customers book the times you're open.
        </Typography>
      </Box>
      <Button
        onClick={() => navigate('/signup')}
        variant="contained"
        sx={{
          flexShrink: 0,
          borderRadius: tokens.radius.pill,
          px: 3,
          py: 1,
          backgroundColor: tokens.paper,
          color: tokens.ink,
          '&:hover': { backgroundColor: '#efece3' },
        }}
      >
        List your business
      </Button>
    </Box>
  );
}
