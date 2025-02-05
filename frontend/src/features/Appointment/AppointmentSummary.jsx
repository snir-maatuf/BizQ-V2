import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Snackbar, Alert} from '@mui/material';

const AppointmentSummary = ({
  selectedOption,
  selectedDate,
  selectedTime,
  clientName,
  clientMail,
  clientPhone,
  specialRequest,
  onSpecialRequestChange,
  onClientNameChange,
  onClientMailChange,
  onClientPhoneChange,
  onSubmit,
}) => {
  const [errors, setErrors] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');

  const validateFullName = (name) => /^[A-Za-z\u0590-\u05FF\s]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^0\d{9}$/.test(phone);

  const handleSubmit = () => {
    const newErrors = {};

    if (!validateFullName(clientName)) {
      newErrors.clientName = 'Must contain only letters';
    }
    if (!validateEmail(clientMail)) {
      newErrors.clientMail = 'Invalid email';
    }
    if (!validatePhone(clientPhone)) {
      newErrors.clientPhone = 'Must start with 0 and be 10 digits';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setAlertMessage('Appointment submitted successfully!');
      setAlertSeverity('success');
      setAlertOpen(true);
      onSubmit();
    } else {
      setAlertMessage('Please fix the errors in the form');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  };

  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      spacing={1.5}
      sx={{
        overflowY: 'auto',
        height: '70vh',
        width: '100%',
      }}
      p={4}
    >
      <Typography variant='h4' textAlign='center'>
        Meeting summary
      </Typography>
      <Typography variant='h6' textAlign='center'>
        {selectedOption}
      </Typography>
      <Typography variant='body1'>Date: {selectedDate}</Typography>
      <Typography variant='body1'>Hour: {selectedTime}</Typography>
      <TextField
        variant='outlined'
        label='full name'
        fullWidth
        value={clientName}
        required
        onChange={(e) => onClientNameChange(e.target.value)}
        error={!!errors.clientName}
        helperText={errors.clientName}
      />
      <TextField
        variant='outlined'
        label='email'
        fullWidth
        type='email'
        value={clientMail}
        required
        onChange={(e) => onClientMailChange(e.target.value)}
        error={!!errors.clientMail}
        helperText={errors.clientMail}
      />
      <TextField
        variant='outlined'
        label='phone'
        fullWidth
        value={clientPhone}
        required
        onChange={(e) => onClientPhoneChange(e.target.value)}
        error={!!errors.clientPhone}
        helperText={errors.clientPhone}
      />
      <TextField
        label='special request'
        multiline
        rows={4}
        value={specialRequest}
        onChange={(e) => onSpecialRequestChange(e.target.value)}
        fullWidth
      />
      <Button variant='contained' onClick={handleSubmit}>
        Approve
      </Button>

      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default AppointmentSummary;
