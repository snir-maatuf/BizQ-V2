import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FrostedBackground from '../features/Generics/FrostedBackground';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import { cancelAppointment, getAppointment } from '../api/Appointment';
import dayjs from 'dayjs';

const CancelAppointment = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm(`Are you sure you want to cancel the appointment?`)) {
      try {
        const result = await cancelAppointment(appointmentId);

        if (result.success) {
          alert('Appointment Cancelled Successfully');
          navigate('/');
        } else {
          alert(`Error occured, Please try to cancel the appointment again`);
        }
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getAppointment(appointmentId).then((data) => {
      if (!data || !data.success) {
        alert('No appointment found');
        navigate('/');
      }

      console.log(data?.data);
      setAppointment(data?.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <Stack alignItems='center' py={2}>
      <FrostedBackground>
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Typography
            variant='h5'
            sx={{ direction: 'rtl', width: '100%', textAlign: 'start' }}
          >
            Appointment:
          </Typography>
          {isLoading ? (
            <CircularProgress
              sx={{ color: 'black' }}
              size={'24px'}
            ></CircularProgress>
          ) : (
            <Stack
              sx={{ direction: 'rtl', alignItems: 'start', width: '100%' }}
              direction={'row'}
              alignItems='center'
              justifyContent='space-between'
            >
              {' '}
              <Stack>
                <Typography variant='h6'>{appointment?.service} </Typography>
                <Typography>
                  Date{' '}
                  {dayjs(appointment?.startDate).format('DD/MM/YYYY H:mm')}
                </Typography>
              </Stack>
              <Button
                onClick={() => handleCancelAppointment(appointmentId)}
                variant='contained'
                color='error'
              >
                Cancel Appointment
              </Button>
            </Stack>
          )}
        </Stack>
      </FrostedBackground>
    </Stack>
  );
};

export default CancelAppointment;
