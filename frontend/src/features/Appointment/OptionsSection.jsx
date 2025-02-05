import React from 'react';
import { Stack, Typography } from '@mui/material';
import OptionComponent from './OptionComponent';

const OptionsSection = ({ services, selectedTypeId, onTypeSelect }) => {
  return (
    <Stack spacing={2} alignItems='center'>
      <Typography variant='h4' gutterBottom>
        Menu 
      </Typography>
      <Stack
        sx={{
          width: '100%',
          maxHeight: '40vh',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          backgroundColor: '#FFFFFF90',
          overflowY: 'auto',
        }}
        spacing={1}
        px={2}
        py={3}
      >
        {services.map((service, index) => (
          <OptionComponent
            optionId={index}
            optionObj={service}
            onSelect={onTypeSelect} // Pass the callback to handle selection
            selectedTypeId={selectedTypeId}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default OptionsSection;
