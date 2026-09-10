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
    <Box sx={{ position: 'relative', minHeight: '100vh', py: { xs: 4, md: 8 } }}>
      <Stack alignItems="center" spacing={4}>
        {!isAppointmentMode ? (
          <BusinessOwnerContainer>
            {/* Business Name */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.6rem' },
                textAlign: 'center',
                mb: 1,
              }}
            >
              {data.businessName}
            </Typography>

            {/* Location */}
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 2, fontWeight: 500, fontSize: '1rem' }}
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
