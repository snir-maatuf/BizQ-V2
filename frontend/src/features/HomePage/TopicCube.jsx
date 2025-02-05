import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopicCube = ({ topicObj }) => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{
        borderRadius: '15px',
        position: 'relative',
        padding: '0px',
        transition: 'scale 0.8s ease', // Smooth transition

        '&:hover': {
          scale: '1.1',
          boxShadow: ' rgba(0, 0, 0, 0.64) 0px 3px 8px',
        },
      }}
      onClick={() => {
        navigate(`/FilterBusiness/${topicObj.name}`);
      }}
    >
      <img
        src={topicObj.src}
        style={{ borderRadius: '15px', width: '100%' }}
      ></img>
      <Stack
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#FFFFFF90',
          borderRadius: '15px',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0, // Hidden by default
          transition: 'opacity 0.8s ease', // Smooth transition
          '&:hover': {
            opacity: 1, // Fully visible on hover
          },
        }}
      >
        <Typography variant='h4' sx={{ color: 'black', fontWeight: '700', textTransform: 'none' }}>
          {topicObj.name}
        </Typography>
      </Stack>
    </Button>
  );
};

export default TopicCube;
