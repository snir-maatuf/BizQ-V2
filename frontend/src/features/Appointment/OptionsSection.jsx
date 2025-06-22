import React, { useRef } from 'react';
import { Typography, Box } from '@mui/material';
import OptionComponent from './OptionComponent';

const CARD_WIDTH = 320; // Keep matching with your OptionComponent
const CARD_GAP = 38;

const OptionsSection = ({ services, selectedTypeId, onTypeSelect }) => {
  const scrollRef = useRef(null);

  // Drag to scroll (desktop, mobile)
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    scrollRef.current.classList.add('active');
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    scrollRef.current.classList.remove('active');
  };

  const handleMouseUp = () => {
    isDown = false;
    scrollRef.current.classList.remove('active');
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.4; // scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: { xs: 3, md: 6 },
        px: 0,
        background: 'linear-gradient(135deg, #f0f4ff 0%, #fef2f8 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 800,
          background: 'linear-gradient(90deg, #667eea 20%, #764ba2 85%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '.05em',
          mb: 4,
          textAlign: 'center',
        }}
      >
        Menu
      </Typography>

      {/* Scrollable Products Row (no arrows, drag to scroll) */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: `${CARD_GAP}px`,
          px: 3,
          py: 1,
          overflowX: 'auto',
          overflowY: 'visible',
          width: '100%',
          maxWidth: `calc(${CARD_WIDTH * Math.min(services.length, 3) + CARD_GAP * (Math.min(services.length, 3) - 1)}px + 32px)`,
          mx: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'thin',
          cursor: 'grab',
          '::-webkit-scrollbar': {
            height: 8,
            background: '#f1f3fa',
            borderRadius: '10px',
          },
          '::-webkit-scrollbar-thumb': {
            background: '#d8dbe7',
            borderRadius: '10px',
          },
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {services.map((service, index) => (
          <Box
            key={service.id || index}
            sx={{
              flex: '0 0 auto',
              width: `${CARD_WIDTH}px`,
              minWidth: { xs: '76vw', sm: `${CARD_WIDTH}px` },
              maxWidth: 380,
              scrollSnapAlign: 'center',
              p: 0,
              bgcolor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
            }}
          >
            <OptionComponent
              optionId={index}
              optionObj={service}
              selectedTypeId={selectedTypeId}
              onSelect={onTypeSelect}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OptionsSection;
