import React from 'react';
import { Button, Typography, Stack, Box } from '@mui/material';
import FrostedBackground from '../features/Generics/FrostedBackground';
import { TOPICS } from '../features/HomePage/data';
import TopicCube from '../features/HomePage/TopicCube';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HomePage() {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryId) => navigate(`/FilterBusiness/${categoryId}`);
  const handleShowAllClick = () => navigate(`/FilterBusiness/all`);

  return (
    <Stack alignItems="center" sx={{ height: '80vh', overflowY: 'hidden', position: 'relative' }}>
      <FrostedBackground>
        <Box sx={{ pt: 8, textAlign: 'center' }}>
          {/* Main Title */}
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '3rem', md: '4.5rem' },
              fontWeight: 800,
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.1em',
              lineHeight: 1.1,
            }}
          >
            BizQ
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontSize: { xs: '1.25rem', md: '1.75rem' },
              fontWeight: 500,
              color: '#333',
              mb: 1,
            }}
          >
            Smart scheduling platform
          </Typography>

          {/* Tagline */}
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 400,
              color: '#666',
              mb: 4,
            }}
          >
            Connecting businesses and customers in one simple solution
          </Typography>
        </Box>

        {/* Topic Cubes */}
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
              onClick={() => handleCategoryClick(topic.id)}
            />
          ))}
        </Stack>

        {/* Show All Button */}
        <Button
          onClick={handleShowAllClick}
          endIcon={<ArrowForwardIcon sx={{ transition: 'transform 0.3s' }} />}
          disableElevation
          sx={{
            position: 'relative',
            px: 5,
            py: 1.75,
            mt: 6,
            borderRadius: '50px',
            background: 'linear-gradient(270deg, #667eea, #764ba2, #6b46c1)',
            backgroundSize: '600% 600%',
            animation: 'gradientShift 8s ease infinite',
            color: '#ffffff',
            fontSize: '1.125rem',
            fontWeight: 500,
            textTransform: 'none',
            boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              animation: 'gradientShift 8s ease infinite reverse',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              transform: 'translateY(-3px)',
              '& .MuiSvgIcon-root': { transform: 'translateX(4px)' },
            },
            '@keyframes gradientShift': {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' },
            },
          }}
        >
          Show All
        </Button>
      </FrostedBackground>
    </Stack>
  );
}