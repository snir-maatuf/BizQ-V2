import React from 'react';
import { Stack, Typography } from '@mui/material';

const OptionComponent = ({ optionId, optionObj, onSelect, selectedTypeId }) => {  
  console.log(selectedTypeId, optionId);
  
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        width: '100%',
        borderBottom: '1px solid gray',
        padding: '10px 0',
        direction: 'rtl',
        cursor: 'pointer',
        backgroundColor: selectedTypeId === optionId ? '#1976d2' : '',
        color: selectedTypeId === optionId ? 'white' : '',
        '&:hover': {
          backgroundColor: selectedTypeId === optionId ? '#0266c9' : '#f5f5f5',
        },
      }}
    >
      <div onClick={() => onSelect(optionId, optionObj.name)} style={{ cursor: 'pointer', width: '80%' }}>
        <Stack direction={'row'} justifyContent="space-between" alignItems="center">
          <Typography variant='h5'>{optionObj.name}</Typography>
          <Typography>{optionObj.price} ש"ח</Typography>
          <Typography>{optionObj.time} דקות</Typography>
        </Stack>
      </div>
    </Stack>
  );
};

export default OptionComponent;
