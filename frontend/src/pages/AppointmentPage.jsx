import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import FrostedBackground from '../features/Generics/FrostedBackground';
import AppointmentBlock from '../features/Appointment/AppointmentBlock';

const AppointmentPage = () => {
  const { id } = useParams();
  
  if (!id) {
    console.error('User ID is not provided. Redirecting to previous page.');
    return (
      <Typography color="error" align="center" mt={4}>
        Error loading data: User ID is not provided.
      </Typography>
    );
  }

  return (
    <Stack alignItems={'center'} pt={2}>
      <FrostedBackground>
        <AppointmentBlock/>
      </FrostedBackground>
    </Stack>
  );
};

export default AppointmentPage;
