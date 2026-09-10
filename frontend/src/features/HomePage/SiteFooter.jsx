import React from 'react';
import { Box, Typography } from '@mui/material';
import { tokens } from '../../theme';

export default function SiteFooter({ city }) {
  return (
    <Box component="footer" sx={{ borderTop: `1px solid ${tokens.line}`, width: '100%' }}>
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography sx={{ fontSize: 12.5, color: tokens.faint }}>
          {`${city ? `Serving ${city} and nearby` : 'Serving Israel'} · © ${new Date().getFullYear()} BizQ`}
        </Typography>
      </Box>
    </Box>
  );
}
