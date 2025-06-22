import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Snackbar, Alert, Paper, Box } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';

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
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '70vh',
        width: '100%',
        background: 'linear-gradient(135deg,#f0f4ff 0%,#fef2f8 100%)',
      }}
    >
      <Paper
        elevation={7}
        sx={{
          borderRadius: '30px',
          maxWidth: 670,
          width: '100%',
          px: { xs: 2, md: 5 },
          py: { xs: 3, md: 6 },
          mt: 2,
          bgcolor: 'rgba(255,255,255,0.93)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 12px 40px 0 #b7b6f222',
        }}
      >
        <Stack spacing={4} alignItems="center" width="100%">
          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              background: 'linear-gradient(90deg,#667eea,#764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
            gutterBottom
          >
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
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#585777',
                letterSpacing: '.01em',
              }}
            >
              {selectedOption}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarMonthOutlinedIcon fontSize="small" sx={{ color: '#764ba2' }} />
              <Typography variant="body1">{selectedDate}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeOutlinedIcon fontSize="small" sx={{ color: '#667eea' }} />
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
                startAdornment: <PersonOutlinedIcon sx={{ mr: 1, color: '#764ba2' }} />,
                sx: {
                  bgcolor: '#f5f6fa',
                  borderRadius: 2.5,
                }
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
                startAdornment: <EmailOutlinedIcon sx={{ mr: 1, color: '#667eea' }} />,
                sx: {
                  bgcolor: '#f5f6fa',
                  borderRadius: 2.5,
                }
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
                startAdornment: <PhoneIphoneOutlinedIcon sx={{ mr: 1, color: '#764ba2' }} />,
                sx: {
                  bgcolor: '#f5f6fa',
                  borderRadius: 2.5,
                }
              }}
            />
            <TextField
              label="special request"
              multiline
              rows={3}
              value={specialRequest}
              onChange={(e) => onSpecialRequestChange(e.target.value)}
              fullWidth
              InputProps={{
                sx: {
                  bgcolor: '#f8f8fb',
                  borderRadius: 2.5,
                }
              }}
            />
          </Stack>

          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                px: 6,
                py: 1.3,
                borderRadius: '30px',
                fontWeight: 700,
                fontSize: '1.09rem',
                letterSpacing: '0.02em',
                background: 'linear-gradient(90deg,#667eea,#764ba2)',
                boxShadow: '0 4px 20px 0 #667eea22',
                textTransform: 'none',
                transition: 'all 0.18s',
                '&:hover': {
                  background: 'linear-gradient(90deg,#764ba2 60%,#667eea 100%)',
                  boxShadow: '0 7px 28px #667eea36',
                  transform: 'translateY(-1.5px) scale(1.025)',
                }
              }}
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
