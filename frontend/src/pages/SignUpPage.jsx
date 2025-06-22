import React, { useEffect, useState } from 'react';
import {
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Tooltip,
  Snackbar,
  Alert,
  Paper,
  Box,
  Divider,
  Collapse,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { WEEK_DAYS, CATEGORIES } from '../features/SignUpPage/data';
import FrostedBackground from '../features/Generics/FrostedBackground';
import { registerBusiness } from '../api/RegisterApi';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useIsLoggedIn } from '../utils/auth';

const SignUpPage = () => {
  const { userId } = useParams();
  const [services, setServices] = useState([{ name: '', price: '', time: '' }]);
  const [workingDays, setWorkingDays] = useState([]);
  const [workingHours, setWorkingHours] = useState({ from: '', to: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');
  const [alertOpen, setAlertOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [businessData, setBusinessData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    phone: '',
    category: '',
    description: '',
    city: '',
    street: '',
    houseNumber: '',
    floor: '',
    apartment: '',
    instagram: '',
    facebook: '',
  });

  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (field, value) => {
    setBusinessData({ ...businessData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must include an uppercase letter';
    if (!/\d/.test(password)) return 'Password must include a number';
    return '';
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const addService = () => setServices([...services, { name: '', price: '', time: '' }]);
  const removeService = (index) => setServices(services.filter((_, i) => i !== index));
  const toggleWorkingDay = (day) => {
    setWorkingDays(
      workingDays.includes(day)
        ? workingDays.filter((d) => d !== day)
        : [...workingDays, day]
    );
  };

  const validateFields = () => {
    const newErrors = {};
    const missingFields = [];
    const requiredFields = [
      { field: 'firstName', label: 'First name' },
      { field: 'lastName', label: 'Last name' },
      { field: 'email', label: 'Email' },
      { field: 'password', label: 'Password' },
      { field: 'confirmPassword', label: 'Password verification' },
      { field: 'businessName', label: 'Business name' },
      { field: 'phone', label: 'Phone number' },
      { field: 'category', label: 'Category' },
      { field: 'city', label: 'City' },
      { field: 'street', label: 'Street' },
      { field: 'houseNumber', label: 'House number' },
    ];
    requiredFields.forEach(({ field, label }) => {
      if (!businessData[field]?.trim()) {
        newErrors[field] = 'This field is required';
        missingFields.push(label);
      }
    });
    if (missingFields.length > 0) {
      setAlertMessage(`Missing fields: ${missingFields.join(', ')}`);
      setAlertSeverity('error');
      setAlertOpen(true);
    }
    if (!emailRegex.test(businessData.email)) newErrors.email = 'Please enter a valid email address';
    const passwordError = validatePassword(businessData.password);
    if (passwordError) newErrors.password = passwordError;
    if (businessData.password !== businessData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (businessData.phone && isNaN(businessData.phone)) newErrors.phone = 'Phone number must be numeric';
    else if (!/^0\d{9}$/.test(businessData.phone)) newErrors.phone = 'This number is invalid ';
    const nameFields = ['firstName', 'lastName', 'businessName', 'city', 'street'];
    nameFields.forEach((field) => {
      if (!/^[A-Za-z\u0590-\u05FF\s-]+$/.test(businessData[field])) newErrors[field] = 'This field must contain letters';
      else if (!businessData[field]?.trim()) {
        newErrors[field] = 'This field is required';
        missingFields.push(field);
      }
    });
    if (!/^\d+$/.test(businessData.houseNumber)) {
      newErrors.houseNumber = 'House number must be numeric';
      missingFields.push('House number');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;
    setIsLoading(true);
    const dataToSubmit = {
      ...businessData,
      services,
      workingDays,
      workingHours,
    };
    try {
      const response = await registerBusiness(dataToSubmit);
      if (response.success) {
        setShowSuccess(true);
        setAlertMessage('Registration successful! Redirecting...');
        setAlertSeverity('success');
        setAlertOpen(true);
        localStorage.setItem('userId', response?.data?.userId);
        setTimeout(() => (window.location.href = '/'), 2500);
      } else {
        setAlertMessage(response?.message || 'Registration failed. Try again.');
        setAlertSeverity('error');
        setAlertOpen(true);
      }
    } catch (error) {
      setAlertMessage('An error occurred during registration. Try again.');
      setAlertSeverity('error');
      setAlertOpen(true);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const dataToUpdate = {
      ...businessData,
      services,
      workingDays,
      workingHours,
    };
    try {
      const docRef = doc(db, 'businesses', userId);
      await updateDoc(docRef, dataToUpdate);
      setAlertMessage('Business updated successfully!');
      setAlertSeverity('success');
      setAlertOpen(true);
      window.location.href = '/';
    } catch (error) {
      setAlertMessage('Failed to update business. Try again.');
      setAlertSeverity('error');
      setAlertOpen(true);
      console.error('Error updating business:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (userId && (!isLoggedIn || userId !== isLoggedIn)) {
      navigate('/signup');
      return;
    }
    const fetchBusinessData = async () => {
      try {
        const docRef = doc(db, 'businesses', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBusinessData({ ...businessData, ...data });
          setServices(data.services || []);
          setWorkingDays(data.workingDays || []);
          setWorkingHours(data.workingHours || { from: '', to: '' });
        } else {
          alert('Business not found.');
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };
    if (userId) fetchBusinessData();
    // eslint-disable-next-line
  }, [userId]);

  // Main layout
  return (
    <Stack spacing={2} alignItems="center" sx={{ py: 5, minHeight: '97vh', px: 1 }}>
      <FrostedBackground>
        <Box
          sx={{
            width: '100%',
            maxWidth: 640,
            mx: 'auto',
            borderRadius: 5,
            background: 'rgba(252,252,255,0.98)',
            boxShadow: '0 6px 48px 0 #cdc3ff33',
            p: { xs: 2, sm: 4, md: 5 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Success or Error Message */}
          <Collapse in={alertOpen}>
            <Alert
              severity={alertSeverity}
              variant="filled"
              sx={{
                mb: 3,
                fontSize: '1.07rem',
                borderRadius: 2,
                fontWeight: 600,
                letterSpacing: '0.01em'
              }}
              onClose={() => setAlertOpen(false)}
            >
              {alertMessage}
            </Alert>
          </Collapse>
          {showSuccess && (
            <Stack alignItems="center" mb={2}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: 'green',
                  mb: 0.5,
                  letterSpacing: '.01em'
                }}
              >
                Signup Success!
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Welcome to BizQ. You’ll be redirected shortly.
              </Typography>
            </Stack>
          )}

          <Stack spacing={4}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                textAlign: 'center',
                background: 'linear-gradient(90deg,#667eea,#764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', sm: '2.5rem' }
              }}
            >
              {userId ? 'Edit business' : 'Create business'}
            </Typography>

            {/* PERSONAL DETAILS */}
            {!userId && (
              <>
                <Typography variant="h5" sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(90deg,#667eea,#764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Personal details</Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  <TextField
                    label="First name" required fullWidth value={businessData.firstName}
                    onChange={e => handleInputChange('firstName', e.target.value)}
                    error={!!errors.firstName} helperText={errors.firstName}
                    sx={{ borderRadius: 2 }}
                  />
                  <TextField
                    label="Last name" required fullWidth value={businessData.lastName}
                    onChange={e => handleInputChange('lastName', e.target.value)}
                    error={!!errors.lastName} helperText={errors.lastName}
                    sx={{ borderRadius: 2 }}
                  />
                  <TextField
                    label="Email" required type="email" fullWidth value={businessData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    error={!!errors.email} helperText={errors.email}
                    sx={{ borderRadius: 2 }}
                  />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <TextField
                      label="Password" required type="password" fullWidth
                      value={businessData.password}
                      onChange={e => handleInputChange('password', e.target.value)}
                      error={!!errors.password} helperText={errors.password}
                    />
                    <Tooltip
                      title={
                        <Box>
                          <Typography>Password Requirements:</Typography>
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            <li>At least 8 characters</li>
                            <li>One uppercase letter</li>
                            <li>One number</li>
                          </ul>
                        </Box>
                      }
                      placement="right"
                      arrow
                    >
                      <IconButton><InfoOutlinedIcon color="info" /></IconButton>
                    </Tooltip>
                  </Stack>
                  <TextField
                    label="Password verification" required type="password" fullWidth
                    value={businessData.confirmPassword}
                    onChange={e => handleInputChange('confirmPassword', e.target.value)}
                    error={!!errors.confirmPassword} helperText={errors.confirmPassword}
                    sx={{ borderRadius: 2 }}
                  />
                </Stack>
              </>
            )}

            {/* BUSINESS DETAILS */}
            <Typography variant="h5" sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg,#667eea,#764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Business details</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              <TextField label="Business name" required fullWidth
                value={businessData.businessName}
                onChange={e => handleInputChange('businessName', e.target.value)}
                error={!!errors.businessName} helperText={errors.businessName}
              />
              <TextField label="Phone number" required fullWidth
                value={businessData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                error={!!errors.phone} helperText={errors.phone}
              />
              <TextField select label="Category" required fullWidth
                value={businessData.category || ''}
                onChange={e => handleInputChange('category', e.target.value)}
                error={!!errors.category} helperText={errors.category}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Business description"
                multiline rows={4} fullWidth
                value={businessData.description}
                onChange={e => handleInputChange('description', e.target.value)}
              />
              <TextField label="City" required fullWidth
                value={businessData.city}
                onChange={e => handleInputChange('city', e.target.value)}
                error={!!errors.city} helperText={errors.city}
              />
              <TextField label="Street" required fullWidth
                value={businessData.street}
                onChange={e => handleInputChange('street', e.target.value)}
                error={!!errors.street} helperText={errors.street}
              />
              <TextField label="House number" required fullWidth
                value={businessData.houseNumber}
                onChange={e => handleInputChange('houseNumber', e.target.value)}
                error={!!errors.houseNumber} helperText={errors.houseNumber}
              />
              <TextField label="Floor" fullWidth
                value={businessData.floor}
                onChange={e => handleInputChange('floor', e.target.value)}
              />
              <TextField label="Apartment number" fullWidth
                value={businessData.apartment}
                onChange={e => handleInputChange('apartment', e.target.value)}
              />
              <TextField label="Instagram account name" fullWidth
                value={businessData.instagram}
                onChange={e => handleInputChange('instagram', e.target.value)}
              />
              <TextField label="Facebook account name" fullWidth
                value={businessData.facebook}
                onChange={e => handleInputChange('facebook', e.target.value)}
              />
            </Stack>

            {/* BUSINESS HOURS */}
            <Typography variant="h5" sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg,#667eea,#764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Business hours</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2} alignItems="center">
              <Typography>Select working days</Typography>
              <Stack direction="row" spacing={1.3} flexWrap="wrap" justifyContent="center">
                {WEEK_DAYS.map((day, index) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={workingDays.includes(index)}
                        onChange={() => toggleWorkingDay(index)}
                      />
                    }
                    label={day}
                  />
                ))}
              </Stack>
              <Typography>Select working hours</Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
                <TextField
                  label="From hour" type="time"
                  value={workingHours.from}
                  onChange={e => setWorkingHours({ ...workingHours, from: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Until hour" type="time"
                  value={workingHours.to}
                  onChange={e => setWorkingHours({ ...workingHours, to: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
            </Stack>

            {/* SERVICES */}
            <Typography variant="h5" sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg,#667eea,#764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Services</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {services.map((service, index) => (
                <Paper key={index} sx={{
                  display: 'flex', gap: 2, p: 2, alignItems: 'center', borderRadius: 3,
                  boxShadow: '0 1.5px 10px #8e98ff11', background: 'rgba(252,252,255,0.97)'
                }}>
                  <TextField
                    label="service name"
                    variant="outlined"
                    value={service.name}
                    onChange={e => handleServiceChange(index, 'name', e.target.value)}
                    sx={{ flex: 2 }}
                  />
                  <TextField
                    label="price"
                    variant="outlined"
                    type="number"
                    value={service.price}
                    onChange={e => handleServiceChange(index, 'price', e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="minutes"
                    variant="outlined"
                    type="number"
                    value={service.time}
                    onChange={e => handleServiceChange(index, 'time', e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <IconButton onClick={() => removeService(index)}>
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </Paper>
              ))}
              <Button
                startIcon={<AddCircleIcon />}
                onClick={addService}
                variant="contained"
                sx={{
                  background: 'linear-gradient(90deg,#667eea,#764ba2)',
                  color: '#fff',
                  fontWeight: 700,
                  px: 4,
                  borderRadius: 3,
                  '&:hover': {
                    background: 'linear-gradient(90deg,#764ba2 50%,#667eea 100%)',
                  }
                }}
              >
                Add service
              </Button>
            </Stack>

            {/* SUBMIT BUTTON */}
            <Stack alignItems="center" width="100%" mt={1}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: 230, borderRadius: '30px', py: 1.3, fontWeight: 800,
                  fontSize: '1.13rem', background: 'linear-gradient(90deg,#667eea,#764ba2)',
                  boxShadow: '0 7px 28px #667eea26', textTransform: 'none', letterSpacing: '0.03em',
                  '&:hover': {
                    background: 'linear-gradient(90deg,#764ba2 60%,#667eea 100%)',
                    boxShadow: '0 12px 34px #764ba236',
                    transform: 'scale(1.025)',
                  }
                }}
                onClick={() => (userId ? handleUpdate() : handleRegister())}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : userId ? 'Save changes' : 'Registration'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </FrostedBackground>
    </Stack>
  );
};

export default SignUpPage;
