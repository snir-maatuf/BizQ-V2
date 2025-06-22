import React from 'react';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { Box, IconButton, Container, Typography, List, ListItem, ListItemText, Button, Tooltip } from '@mui/material';

export const BusinessOwnerContainer = ({ children, sx }) => (
  <Container maxWidth="md" sx={{ p: 0 }}>
    <Box
      sx={{
        textAlign: 'center',
        mt: 6,
        p: { xs: 2, md: 4 },
        width: { xs: '95%', md: '75%' },
        minHeight: '24vh',
        backdropFilter: 'blur(14px)',
        borderRadius: '28px',
        background: 'rgba(255,255,255,0.8)',
        boxShadow: '0 8px 32px rgba(102,126,234,0.11), 0 1.5px 4px rgba(0,0,0,0.06)',
        overflowY: 'auto',
        margin: 'auto',
        border: '1px solid #f4f6fb',
        ...sx,
      }}
    >
      {children}
    </Box>
  </Container>
);

// Modernized Social Media Bar
export const SocialMediaIcons = ({
  facebook,
  instagram,
  address,
  name,
  whatsApp,
  phone,
}) => {
  const { city, street, houseNumber } = address || {};
  const addressString = `${street || ''} ${houseNumber || ''}, ${city || ''}`;
  const iconStyle = {
    mx: 1,
    bgcolor: 'white',
    border: '1.5px solid #e3e8f0',
    boxShadow: '0 2px 8px rgba(118,75,162,0.06)',
    color: '#667eea',
    '&:hover': {
      bgcolor: '#f3f4fa',
      color: '#764ba2',
      transform: 'scale(1.12)',
    },
    transition: 'all 0.18s cubic-bezier(.4,0,.2,1)'
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={2} sx={{ mb: 1 }}>
      {facebook && (
        <Tooltip title="Facebook">
          <IconButton
            href={`https://www.facebook.com/${encodeURIComponent(facebook)}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={iconStyle}
          >
            <Facebook fontSize="medium" />
          </IconButton>
        </Tooltip>
      )}
      {whatsApp && (
        <Tooltip title="WhatsApp">
          <IconButton
            sx={{ ...iconStyle, color: '#25d366', border: '1.5px solid #d4f5e9' }}
            href={`https://wa.me/${whatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp fontSize="medium" />
          </IconButton>
        </Tooltip>
      )}
      {instagram && (
        <Tooltip title="Instagram">
          <IconButton
            href={`https://www.instagram.com/${encodeURIComponent(instagram)}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ ...iconStyle, color: '#e1306c', border: '1.5px solid #fde3ef' }}
          >
            <Instagram fontSize="medium" />
          </IconButton>
        </Tooltip>
      )}
      {addressString && (
        <Tooltip title="Navigate in Waze">
          <IconButton
            href={`https://waze.com/ul?q=${encodeURIComponent(addressString)}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={iconStyle}
          >
            <img src="/static/socialMediaIcons/Waze_icon.png" alt="Waze" width={24} height={24} />
          </IconButton>
        </Tooltip>
      )}
      {addressString && (
        <Tooltip title="Open in Google Maps">
          <IconButton
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={iconStyle}
          >
            <img src="/static/socialMediaIcons/GoogleMapsIcon.png" alt="Google Maps" width={24} height={24} />
          </IconButton>
        </Tooltip>
      )}
      {phone && (
        <Tooltip title="Call">
          <IconButton
            href={`tel:${phone}`}
            sx={iconStyle}
          >
            <Typography fontWeight={600} fontSize="0.92rem" color="inherit">Call</Typography>
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export const AboutUs = ({ aboutUs }) => (
  <Box sx={{ my: 2 }}>
    <Typography variant="h5" gutterBottom sx={{
      fontWeight: 700,
      letterSpacing: '0.03em',
      color: 'primary.main',
      mb: 1,
    }}>
      About Us
    </Typography>
    <List
      sx={{
        direction: 'rtl',
        textAlign: 'center',
        px: 0,
        py: 0,
        m: 0,
        bgcolor: 'transparent',
      }}
    >
      {aboutUs.map((desc, idx) => (
        <ListItem
          key={idx}
          sx={{
            justifyContent: 'center',
            py: 0.5,
            px: 0,
            bgcolor: 'transparent',
          }}
        >
          <ListItemText primary={desc} sx={{ textAlign: 'center', m: 0, lineHeight: 1.5 }} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export const ScheduleButton = ({ onClick, text }) => (
  <Button
    onClick={onClick}
    sx={{
      mt: 3,
      py: 1.5,
      px: 5,
      borderRadius: '32px',
      background: 'linear-gradient(90deg, #667eea, #764ba2 90%)',
      color: '#fff',
      fontWeight: 700,
      fontSize: '1.1rem',
      textTransform: 'none',
      boxShadow: '0 6px 18px rgba(102,126,234,0.15)',
      letterSpacing: '0.03em',
      transition: 'all 0.22s cubic-bezier(.4,0,.2,1)',
      '&:hover': {
        background: 'linear-gradient(90deg, #764ba2 20%, #667eea 100%)',
        transform: 'translateY(-2px) scale(1.04)',
        boxShadow: '0 10px 32px rgba(102,126,234,0.22)',
      },
    }}
    disableElevation
  >
    {text}
  </Button>
);

export default SocialMediaIcons;
