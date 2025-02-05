import { Stack } from '@mui/material';

const FrostedBackground = ({ children }) => (
  <Stack
    sx={{
      position: 'relative', // Ensure it's positioned for child stacking
      width: '70%',
      height: '100%',
      backdropFilter: 'blur(10px)', // Blurred background effect
      borderRadius: '20px',
      backgroundColor: '#FFFFFF60', // Semi-transparent background
      flex: 1,
      overflow: 'hidden', // Prevent overflow
    }}
    alignItems={'center'}
    p={2}
    px={6}
  >
    {children}
  </Stack>
);

export default FrostedBackground;