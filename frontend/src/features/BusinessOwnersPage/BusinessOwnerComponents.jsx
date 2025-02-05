import React from 'react';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { Box,IconButton,Container,Typography,List,ListItem,ListItemText,Button} from '@mui/material';

export const BusinessOwnerContainer = ({ children, sx }) => (
  <Container>
    <Box
      sx={{
        textAlign: 'center',
        mt: 4,
        p: 2,
        width: '70%',
        minHeight: '20vh',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        backgroundColor: '#FFFFFF90',
        boxShadow: 2,
        overflowY: 'auto',
        margin: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      }}
    >
      {children}
    </Box>
  </Container>
);

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
  return (
    <Box display='flex' justifyContent='center' gap={1}>
      {facebook && (
        <IconButton
          color='primary'
          href={`https://www.facebook.com/${encodeURIComponent(facebook)}`}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Facebook'
        >
          <Facebook />
        </IconButton>
      )}
      {whatsApp && (
        <IconButton
          sx={{ color: 'green' }}
          href={`https://wa.me/${whatsApp}/?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A2%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%91%D7%A0%D7%95%D7%92%D7%A2%20%D7%9C%D7%A2%D7%A1%D7%A7%20%D7%A9%D7%9C%D7%9A`}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Instagram'
        >
          <WhatsApp />
        </IconButton>
      )}

      {instagram && (
        <IconButton
          color='secondary'
          href={`https://www.instagram.com/${encodeURIComponent(instagram)}`}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Instagram'
        >
          <Instagram />
        </IconButton>
      )}
      { addressString && (
        <IconButton
          href={`https://waze.com/ul?q=${encodeURIComponent(addressString)}`}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Waze'
        >
          <img
            src='../static/socialMediaIcons/Waze_icon.png'
            alt='Waze'
            style={{ width: 26, height: 26 }}
          />
        </IconButton>
      )}
      { addressString && (
        <IconButton
          color='secondery'
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            addressString
          )}`}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Google Maps'
        >
          <img
            src='../static/socialMediaIcons/GoogleMapsIcon.png'
            alt='Waze'
            style={{ width: 26, height: 26 }}
          />
        </IconButton>
      )}
      {phone && (
        <IconButton color='primary' href={`tel:${phone}`} aria-label='Phone'>
          <Typography variant='body2'>Call</Typography>
        </IconButton>
      )}
    </Box>
  );
};

export const AboutUs = ({ aboutUs }) => (
  <div>
    <Typography variant='h5' gutterBottom>
      About Us
    </Typography>
    <List
      style={{ direction: 'rtl', textAlign: 'center', padding: 0, margin: 0 }}
    >
      {aboutUs.map((description, index) => (
        <ListItem
          key={index}
          style={{ justifyContent: 'center', paddingTop: 0, paddingBottom: 0 }}
        >
          <ListItemText
            primary={description}
            style={{ textAlign: 'center', margin: 0, lineHeight: '1.2' }}
          />
        </ListItem>
      ))}
    </List>
  </div>
);

export const ScheduleButton = ({ onClick, text }) => (
  <Button
    variant='contained'
    color='primary'
    style={{
      marginTop: '20px',
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'none',
      padding: '10px 20px',
      borderRadius: '30px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    }}
    onClick={onClick}
  >
    {text}
  </Button>
);

export default SocialMediaIcons;
