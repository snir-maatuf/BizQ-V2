import { Stack } from '@mui/material';
import { tokens } from '../../theme';

/**
 * Shared content surface. A clean white panel on the warm page ground —
 * hairline border, one soft shadow, no blur.
 */
const FrostedBackground = ({ children }) => (
  <Stack
    sx={{
      position: 'relative',
      width: { xs: '94%', sm: '88%', md: '78%' },
      maxWidth: 1080,
      minHeight: '100%',
      borderRadius: tokens.radius.lg,
      backgroundColor: tokens.paper,
      border: `1px solid ${tokens.line}`,
      boxShadow: '0 1px 2px rgba(20,18,12,0.04), 0 12px 32px rgba(20,18,12,0.06)',
      flex: 1,
      overflow: 'hidden',
    }}
    alignItems="center"
    justifyContent="center"
    p={{ xs: 2.5, sm: 4 }}
  >
    {children}
  </Stack>
);

export default FrostedBackground;
