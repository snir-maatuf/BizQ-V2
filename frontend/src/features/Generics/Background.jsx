import React from 'react';
import { Stack } from '@mui/material';

export default function Background() {
  return (
    <Stack
      sx={{
        backgroundColor: '#ffffff',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        zIndex: -1,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          width: '60%',
          height: '60%',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(129,140,248,0.3))',
          borderRadius: '50%',
          filter: 'blur(100px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '50%',
          height: '50%',
          background: 'linear-gradient(225deg, rgba(236,72,153,0.5), rgba(249,115,22,0.3))',
          borderRadius: '50%',
          filter: 'blur(100px)',
        },
      }}
    />
  );
}
