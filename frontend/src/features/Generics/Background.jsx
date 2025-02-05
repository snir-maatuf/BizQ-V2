import { Stack } from '@mui/material';

const Background = () => (
  <Stack
    sx={{
      backgroundImage: 'url(/static/wallpaper/BizQ.png)',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      zIndex: '-1',
      left: '0px',
      top: '0px',

      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}
  ></Stack>
);
export default Background;
