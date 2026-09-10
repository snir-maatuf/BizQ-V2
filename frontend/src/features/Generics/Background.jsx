import React from 'react';
import { Box } from '@mui/material';

/**
 * Global page ground. Warm off-white with two very faint warm blooms —
 * enough to keep the page from feeling flat, quiet enough to sit under any surface.
 */
export default function Background() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        backgroundColor: '#fbfaf6',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-24%',
          left: '-18%',
          width: '55%',
          height: '55%',
          background:
            'radial-gradient(circle, rgba(31,111,92,0.06), rgba(31,111,92,0) 70%)',
          filter: 'blur(90px)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-20%',
          right: '-14%',
          width: '50%',
          height: '50%',
          background:
            'radial-gradient(circle, rgba(214,180,130,0.10), rgba(214,180,130,0) 70%)',
          filter: 'blur(90px)',
        },
      }}
    />
  );
}
