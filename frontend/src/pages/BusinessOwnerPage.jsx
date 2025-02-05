import {Box,Typography,Divider,CircularProgress,Stack,} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {SocialMediaIcons,BusinessOwnerContainer,ScheduleButton,} from '../features/BusinessOwnersPage/BusinessOwnerComponents';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import FrostedBackground from '../features/Generics/FrostedBackground';
import AppointmentBlock from '../features/Appointment/AppointmentBlock';

const BusinessOwnerPage = ({ userId }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAppointmentMode, setIsAppointmentMode] = useState(false);
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const docRef = doc(db, 'businesses', userId || id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setData(data);
        } else {
          setError('לא נמצא בעל עסק');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessData();
  }, [userId, id]);

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant='h6' align='center' color='error' mt={4}>
        Error loading data: {error}
      </Typography>
    );
  }

  const handleScheduleAppointment = () => {
    setIsAppointmentMode(true);
  };

  return (
    <Stack alignItems={'center'}>
      {!isAppointmentMode ? (
        <BusinessOwnerContainer sx={{ width: '80%' }}>
          {/* Business Owner Name */}
          <Typography variant='h4' gutterBottom>
            {data.businessName}
          </Typography>

          {/* Divider */}
          <Divider sx={{ my: 1 }} />

          {/* Location */}
          <Typography variant='body1' color='textSecondary' gutterBottom>
            {data.city +
              ',' +
              data.street +
              ',' +
              data.houseNumber}
          </Typography>

          {/* Social Media */}
          <SocialMediaIcons
            facebook={data.facebook}
            instagram={data.instagram}
            address={data}
            name={data.name}
            whatsApp={data.phone}
            phone={data.phone}
          />

          {/* Divider */}
          <Divider sx={{ my: 1 }} />

          {/* About Us */}
          <div>
            <Typography variant='h5' gutterBottom>
              About Us
            </Typography>
            <Typography
              variant='body1'
              style={{ textAlign: 'center', marginTop: '10px' }}
            >
              {data.description || 'No description'}
            </Typography>
          </div>

          {/* Schedule Button */}
          <ScheduleButton onClick={handleScheduleAppointment} text='Schedule' />
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
  );
};

export default BusinessOwnerPage;
