import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Snackbar, Alert, Paper, Box } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import { tokens } from '../../theme';

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

  // <--- Validation functions --->
  const validateFullName = (name) => /^[A-Za-z\u0590-\u05FF\s]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^0\d{9}$/.test(phone);

  // <--- Handle submit --->
  const handleSubmit = () => {
    const newErrors = {};
    if (!validateFullName(clientName)) newErrors.clientName = 'Must contain only letters';
    if (!validateEmail(clientMail)) newErrors.clientMail = 'Invalid email';
    if (!validatePhone(clientPhone)) newErrors.clientPhone = 'Must start with 0 and be 10 digits';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setAlertMessage('Appointment submitted successfully!');
      setAlertSeverity('success');
      setAlertOpen(true);
      onSubmit && onSubmit();
      // <--- Redirect to main page after short delay --->
      setTimeout(() => {
        window.location.href = '/';
      }, 1500); // 1.5 seconds so the user can see the success
    } else {
      setAlertMessage('Please fix the errors in the form');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '70vh', width: '100%' }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: tokens.radius.lg,
          maxWidth: 670,
          width: '100%',
          px: { xs: 2, md: 5 },
          py: { xs: 3, md: 5 },
          mt: 2,
          border: `1px solid ${tokens.line}`,
        }}
      >
        <Stack spacing={4} alignItems="center" width="100%">
          {/* Title */}
          <Typography variant="h4" sx={{ fontWeight: 800, textAlign: 'center' }} gutterBottom>
            Meeting summary
          </Typography>

          {/* Summary Info Row */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {selectedOption}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarMonthOutlinedIcon fontSize="small" color="primary" />
              <Typography variant="body1">{selectedDate}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeOutlinedIcon fontSize="small" color="primary" />
              <Typography variant="body1">{selectedTime}</Typography>
            </Stack>
          </Stack>

          {/* Form */}
          <Stack spacing={2} width="100%">
            <TextField
              variant="outlined"
              label="full name"
              fullWidth
              required
              value={clientName}
              onChange={(e) => onClientNameChange(e.target.value)}
              error={!!errors.clientName}
              helperText={errors.clientName}
              InputProps={{
                startAdornment: <PersonOutlinedIcon sx={{ mr: 1 }} color="primary" />,
                sx: { bgcolor: tokens.fieldFill }
              }}
            />
            <TextField
              variant="outlined"
              label="email"
              fullWidth
              required
              type="email"
              value={clientMail}
              onChange={(e) => onClientMailChange(e.target.value)}
              error={!!errors.clientMail}
              helperText={errors.clientMail}
              InputProps={{
                startAdornment: <EmailOutlinedIcon sx={{ mr: 1 }} color="primary" />,
                sx: { bgcolor: tokens.fieldFill },
              }}
            />
            <TextField
              variant="outlined"
              label="phone"
              fullWidth
              required
              value={clientPhone}
              onChange={(e) => onClientPhoneChange(e.target.value)}
              error={!!errors.clientPhone}
              helperText={errors.clientPhone}
              InputProps={{
                startAdornment: <PhoneIphoneOutlinedIcon sx={{ mr: 1 }} color="primary" />,
                sx: { bgcolor: tokens.fieldFill },
              }}
            />
            <TextField
              label="special request"
              multiline
              rows={3}
              value={specialRequest}
              onChange={(e) => onSpecialRequestChange(e.target.value)}
              fullWidth
              InputProps={{ sx: { bgcolor: tokens.fieldFill } }}
            />
          </Stack>

          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              sx={{ px: 5, py: 1.25, minWidth: 200 }}
            >
              Approve
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Alerts */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default AppointmentSummary;
