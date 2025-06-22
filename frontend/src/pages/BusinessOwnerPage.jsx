import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Stack } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import FrostedBackground from '../features/Generics/FrostedBackground';
import AppointmentBlock from '../features/Appointment/AppointmentBlock';
import {
  BusinessOwnerContainer,
  SocialMediaIcons,
  AboutUs,
  ScheduleButton,
} from '../features/BusinessOwnersPage/BusinessOwnerComponents';

export default function BusinessOwnerPage({ userId }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAppointmentMode, setIsAppointmentMode] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'businesses', userId || id));
        if (snap.exists()) setData(snap.data());
        else setError('לא נמצא בעל עסק');
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={48} />
      </Box>
    );

  if (error)
    return (
      <Typography variant="h6" align="center" color="error" mt={4}>
        Error loading data: {error}
      </Typography>
    );

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
        background: 'linear-gradient(135deg, #f0f4ff 0%, #fef2f8 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Blobs for visual flair */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '-10%', md: '-12%' },
          left: { xs: '-12%', md: '-10%' },
          width: { xs: 220, md: 340 },
          height: { xs: 220, md: 340 },
          background: 'radial-gradient(circle, #667eea55, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '-10%', md: '-8%' },
          right: { xs: '-12%', md: '-8%' },
          width: { xs: 200, md: 320 },
          height: { xs: 200, md: 320 },
          background: 'radial-gradient(circle, #764ba255, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      <Stack alignItems="center" sx={{ position: 'relative', zIndex: 1 }} spacing={4}>
        {!isAppointmentMode ? (
          <BusinessOwnerContainer>
            {/* Business Name */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.1rem', md: '2.8rem' },
                background: 'linear-gradient(90deg, #667eea 10%, #764ba2 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                mb: 1,
                letterSpacing: '.05em'
              }}
            >
              {data.businessName}
            </Typography>

            {/* Location */}
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 2, fontWeight: 500, fontSize: '1.07rem' }}
            >
              {`${data.street} ${data.houseNumber}, ${data.city}`}
            </Typography>

            {/* Social Media Bar */}
            <SocialMediaIcons
              facebook={data.facebook}
              instagram={data.instagram}
              address={data}
              name={data.businessName}
              whatsApp={data.phone}
              phone={data.phone}
            />

            {/* About Us */}
            <AboutUs aboutUs={data.description ? [data.description] : []} />

            {/* Schedule Button */}
            <Box textAlign="center" sx={{ mt: 2 }}>
              <ScheduleButton
                onClick={() => setIsAppointmentMode(true)}
                text="Schedule Appointment"
              />
            </Box>
          </BusinessOwnerContainer>
        ) : (
          <FrostedBackground>
            <AppointmentBlock
              setIsAppointmentMode={setIsAppointmentMode}
              businessData={data}
            />
          </FrostedBackground>
        )}
      </Stack>
    </Box>
  );
}
