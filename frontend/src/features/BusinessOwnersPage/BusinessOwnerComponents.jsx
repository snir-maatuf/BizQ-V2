import React from 'react';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { Box, IconButton, Container, Typography, List, ListItem, ListItemText, Button, Tooltip } from '@mui/material';
import { tokens } from '../../theme';

export const BusinessOwnerContainer = ({ children, sx }) => (
  <Container maxWidth="md" sx={{ p: 0 }}>
    <Box
      sx={{
        textAlign: 'center',
        mt: { xs: 3, md: 6 },
        p: { xs: 2.5, md: 4 },
        width: { xs: '94%', md: '80%' },
        minHeight: '24vh',
        borderRadius: tokens.radius.lg,
        backgroundColor: tokens.paper,
        border: `1px solid ${tokens.line}`,
        boxShadow: '0 1px 2px rgba(20,18,12,0.04), 0 12px 32px rgba(20,18,12,0.06)',
        overflowY: 'auto',
        margin: 'auto',
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
    mx: 0.5,
    bgcolor: tokens.paper,
    border: `1px solid ${tokens.line}`,
    color: tokens.green,
    '&:hover': {
      bgcolor: tokens.greenSoft,
      color: tokens.greenDark,
    },
    transition: 'background-color 0.18s ease, color 0.18s ease',
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
    variant="contained"
    color="primary"
    disableElevation
    sx={{ mt: 3, py: 1.4, px: 4, fontSize: '1rem', borderRadius: tokens.radius.pill }}
  >
    {text}
  </Button>
);

export default SocialMediaIcons;
