import React from 'react';
import { Typography, Box, Chip, Fade } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const OptionComponent = ({
  optionId,
  optionObj,
  onSelect,
  selectedTypeId,
}) => {
  const isSelected = selectedTypeId === optionId;

  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          width: '100%',
          cursor: 'pointer',
          borderRadius: '22px',
          background: isSelected
            ? 'linear-gradient(99deg, #e8eafc 60%, #ede5fb 100%)'
            : 'rgba(255,255,255,0.98)',
          border: isSelected
            ? '2.5px solid #764ba2'
            : '1.5px solid #e7eaf5',
          boxShadow: isSelected
            ? '0 6px 32px 0 rgba(102,126,234,0.16)'
            : '0 1.5px 8px 0 rgba(102,126,234,0.05)',
          p: 3,
          m: 1,
          minHeight: 130,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 1,
          transition: 'all 0.23s cubic-bezier(.4,0,.2,1)',
          '&:hover': {
            background: 'linear-gradient(90deg,#f2f6ff 80%,#ede5fb 100%)',
            boxShadow: '0 8px 38px 0 rgba(102,126,234,0.13)',
            border: '2px solid #667eea',
          },
          direction: 'rtl',
        }}
        onClick={() => onSelect(optionId, optionObj.name)}
        dir="rtl"
      >
        {/* Name */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            textAlign: 'right',
            fontSize: '1.2rem',
            mb: 0.4,
            color: isSelected ? '#764ba2' : '#212121',
          }}
        >
          {optionObj.name}
        </Typography>
        {/* Description */}
        {optionObj.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: 'right', fontSize: '0.98rem', mb: 0.4 }}
          >
            {optionObj.description}
          </Typography>
        )}
        {/* Price & Duration */}
        <Box display="flex" alignItems="center" gap={1}>
          <Chip
            icon={<AttachMoneyIcon sx={{ color: '#fff' }} />}
            label={`${optionObj.price} ש"ח`}
            sx={{
              background: 'linear-gradient(90deg,#667eea,#764ba2)',
              color: '#fff',
              fontWeight: 600,
              px: 1.5,
              fontSize: '1.08rem',
              letterSpacing: '0.03em',
            }}
            size="small"
          />
          <Chip
            icon={<AccessTimeIcon sx={{ color: '#fff' }} />}
            label={`${optionObj.time || optionObj.duration} דקות`}
            sx={{
              background: '#e3e9fb',
              color: '#556',
              fontWeight: 500,
              px: 1.2,
              fontSize: '1.01rem',
            }}
            size="small"
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default OptionComponent;
