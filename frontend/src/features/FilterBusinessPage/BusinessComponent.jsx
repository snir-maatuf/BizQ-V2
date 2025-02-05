import { Stack, Typography } from '@mui/material';
import React from 'react';

const BusinessComponent = ({ businessObj }) => {
  return (
    <Stack
      direction={'row'}
      sx={{ direction: 'rtl', width: '100%', borderBottom: '1px solid gray' }}
      justifyContent={'space-around'}
      alignItems={'center'}
      pb={2}
    >
      <Typography variant='h5'>{businessObj.name}</Typography>
      <Stack alignItems={'center'}>
        <Typography sx={{ color: 'gray' }}>
          {businessObj.location.city}
        </Typography>

        <Typography sx={{ color: 'gray' }}>
          {businessObj.location.address}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default BusinessComponent;
