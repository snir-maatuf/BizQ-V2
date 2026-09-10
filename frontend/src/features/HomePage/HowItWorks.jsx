import React from 'react';
import { Box, Typography } from '@mui/material';
import { tokens } from '../../theme';

const STEPS = [
  { n: 1, t: 'Find', d: 'Search or pick a category near you.' },
  { n: 2, t: 'Pick a time', d: 'See real openings and choose one.' },
  { n: 3, t: "You're booked", d: 'Confirmed on the spot - cancel anytime.' },
];

export default function HowItWorks() {
  return (
    <Box id="how-it-works" sx={{ scrollMarginTop: 80 }}>
      <Typography
        variant="h3"
        sx={{ fontSize: { xs: 18, md: 20 }, mb: { xs: 1.75, md: 2 } }}
      >
        How it works
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: { xs: 1.5, md: 2.5 },
        }}
      >
        {STEPS.map((s) => (
          <Box key={s.n} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
            <Box
              sx={{
                flex: 'none',
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
                fontSize: 12.5,
                color: tokens.green,
                backgroundColor: tokens.greenSoft,
              }}
            >
              {s.n}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 14.5, mb: 0.15 }}>{s.t}</Typography>
              <Typography sx={{ fontSize: 13.5, color: tokens.muted }}>{s.d}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
