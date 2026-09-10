import React from 'react';
import { Typography, Box, Chip, Fade } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { tokens } from '../../theme';

const OptionComponent = ({ optionId, optionObj, onSelect, selectedTypeId }) => {
  const isSelected = selectedTypeId === optionId;

  return (
    <Fade in timeout={250}>
      <Box
        onClick={() => onSelect(optionId, optionObj.name)}
        dir="rtl"
        sx={{
          width: '100%',
          cursor: 'pointer',
          borderRadius: tokens.radius.md,
          backgroundColor: isSelected ? tokens.greenSoft : tokens.paper,
          border: `1px solid ${isSelected ? tokens.green : tokens.line}`,
          p: 2.5,
          m: 1,
          minHeight: 130,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 1,
          transition: 'border-color .18s ease, background-color .18s ease',
          '&:hover': { borderColor: isSelected ? tokens.green : '#cfe4dd' },
          direction: 'rtl',
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            textAlign: 'right',
            fontSize: '1.15rem',
            mb: 0.4,
            color: isSelected ? tokens.green : 'text.primary',
          }}
        >
          {optionObj.name}
        </Typography>
        {optionObj.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'right', fontSize: '0.95rem', mb: 0.4 }}
          >
            {optionObj.description}
          </Typography>
        )}
        <Box display="flex" alignItems="center" gap={1}>
          <Chip
            label={`₪${optionObj.price}`}
            size="small"
            sx={{ bgcolor: tokens.green, color: '#fff', fontWeight: 600, px: 1 }}
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={`${optionObj.time || optionObj.duration} דקות`}
            size="small"
            variant="outlined"
            sx={{ borderColor: tokens.line, color: 'text.secondary', fontWeight: 500, px: 0.75 }}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default OptionComponent;
