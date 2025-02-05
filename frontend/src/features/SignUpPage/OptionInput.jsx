import { Stack, TextField } from '@mui/material';
import React from 'react';

const OptionInput = () => {
  return (
    <Stack direction={'row'} spacing={2}>
      <TextField variant='standard' placeholder='Treatment name'></TextField>
      <TextField variant='standard' placeholder='Price'></TextField>
      <TextField variant='standard' placeholder='time in minutes'></TextField>
    </Stack>
  );
};

export default OptionInput;
