import React from 'react';
import { Button, Typography, Stack } from '@mui/material';
import FrostedBackground from '../features/Generics/FrostedBackground';
import { TOPICS } from '../features/HomePage/data';
import TopicCube from '../features/HomePage/TopicCube';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/FilterBusiness/${categoryId}`);
  };

  const handleShowAllClick = () => {
    navigate(`/FilterBusiness/all`);
  };

  return (
    <Stack alignItems="center" sx={{ height: '80vh', overflowY: 'hidden' }}>
      <FrostedBackground>
       <Typography variant="h1">
        BizQ
        </Typography>
        <Typography variant="h4">
         Smart scheduling platform
        </Typography>
        <Typography variant="h4">
          Connecting businesses and customers in one simple solution
        </Typography>
        <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%', height: '100%' }}
        >
          {TOPICS.map((topic) => (
            <TopicCube
              key={topic.id}
              topicObj={topic}
            />
          ))}
        </Stack>
        <Button
          onClick={handleShowAllClick}
          variant="contained"
          sx={{ backgroundColor: 'black', borderRadius: '30px' }}
        >
          <Typography variant="h5" sx={{ textTransform: 'none' }}> Show all</Typography>
        </Button>
      </FrostedBackground>
    </Stack>
  );
};

export default HomePage;
