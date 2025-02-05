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
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { WEEK_DAYS, CATEGORIES } from '../features/SignUpPage/data';
import FrostedBackground from '../features/Generics/FrostedBackground';
import { registerBusiness } from '../api/RegisterApi';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useIsLoggedIn } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

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
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must include an uppercase letter';
    }
    if (!/\d/.test(password)) {
      return 'Password must include a number';
    }
    return '';
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const addService = () => {
    setServices([...services, { name: '', price: '', time: '' }]);
  };

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const toggleWorkingDay = (day) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    const missingFields = [];
    // Validate required fields
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

    if (!emailRegex.test(businessData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const passwordError = validatePassword(businessData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (businessData.password !== businessData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (businessData.phone && isNaN(businessData.phone)) {
      newErrors.phone = 'Phone number must be numeric';
    } else {
      if (!/^0\d{9}$/.test(businessData.phone)) {
        newErrors.phone = 'This number is invalid ';
      }
    }

    const nameFields = [
      'firstName',
      'lastName',
      'businessName',
      'city',
      'street',
    ];
    nameFields.forEach((field) => {
      if (!/^[A-Za-z\u0590-\u05FF\s-]+$/.test(businessData[field])) {
        newErrors[field] = 'This field must contain letters';
      } else if (!businessData[field]?.trim()) {
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
    // Proceed with form submission
    const dataToSubmit = {
      ...businessData,
      city: businessData.city,
      street: businessData.street,
      houseNumber: businessData.houseNumber,
      floor: businessData.floor,
      apartment: businessData.apartment,
      services,
      workingDays,
      workingHours,
    };

    try {
      const response = await registerBusiness(dataToSubmit);

      if (response.success) {
        setAlertMessage('Registration successful!');
        setAlertSeverity('success');
        setAlertOpen(true);
        localStorage.setItem('userId', response?.data?.userId);
        setTimeout(() => (window.location.href = '/'), 2000);
      }
    } catch (error) {
      setAlertMessage(
        'An error occurred during the registration process. Try again.'
      );
      setAlertSeverity('error');
      setAlertOpen(true);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const dataToUpdate = {
      ...businessData,
      address: {
        city: businessData.city,
        street: businessData.street,
        houseNumber: businessData.houseNumber,
        floor: businessData.floor,
        apartment: businessData.apartment,
      },
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
    // Authorization validation
    if (!userId || !isLoggedIn || userId !== isLoggedIn) {
      navigate('/signup');
      return;
    }
    const fetchBusinessData = async () => {
      try {
        const docRef = doc(db, 'businesses', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data);
          setBusinessData({
            ...businessData,
            ...data,
          });
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

    fetchBusinessData();
  }, [userId]);

  return (
    <Stack spacing={2} alignItems='center' sx={{ paddingBottom: 4 }}>
      <FrostedBackground>
        <Typography variant='h3' mb={4}>
          {userId ? 'Edit' : 'Create'} business
        </Typography>

        {/* Personal Information Section */}
        {!userId && (
          <Stack>
            <Typography variant='h5'>PERSONAL DETAILS</Typography>
            <Stack spacing={2} mb={4}>
              <TextField
                variant='outlined'
                label='First name'
                fullWidth
                required
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                variant='outlined'
                label='Last name'
                fullWidth
                required
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                variant='outlined'
                label='Email'
                fullWidth
                type='email'
                required
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
              <Stack direction='row' alignItems='center' spacing={1}>
                <TextField
                  variant='outlined'
                  label='Password'
                  fullWidth
                  type='password'
                  required
                  value={businessData.password}
                  onChange={(e) =>
                    handleInputChange('password', e.target.value)
                  }
                  error={!!errors.password}
                  helperText={errors.password}
                />

                <Tooltip
                  title={
                    <div>
                      <Typography>Password Requirements:</Typography>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li>Password must be at least 8 characters</li>
                        <li>Must include an uppercase letter</li>
                        <li>Must include a number</li>
                      </ul>
                    </div>
                  }
                  placement='right'
                  arrow
                >
                  <IconButton>
                    <InfoOutlinedIcon color='info' />
                  </IconButton>
                </Tooltip>
              </Stack>

              <TextField
                variant='outlined'
                label='Password verification'
                fullWidth
                type='password'
                required
                value={businessData?.confirmPassword}
                onChange={(e) =>
                  handleInputChange('confirmPassword', e.target.value)
                }
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Stack>
          </Stack>
        )}
        {/* Business Information Section */}
        <Typography variant='h5'>BUSINESS DETAILS</Typography>
        <Stack spacing={2} mb={4}>
          <TextField
            variant='outlined'
            label='Business name'
            fullWidth
            required
            value={businessData?.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            error={!!errors.businessName}
            helperText={errors.businessName}
          />
          <TextField
            variant='outlined'
            label='Phone number'
            fullWidth
            required
            value={businessData?.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            select
            variant='outlined'
            label='Category'
            fullWidth
            required
            onChange={(e) => handleInputChange('category', e.target.value)}
            error={!!errors.category}
            helperText={errors.category}
            value={businessData?.category || ''}
          >
            {CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant='outlined'
            label='Business description'
            fullWidth
            multiline
            rows={5}
            value={businessData?.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
          <TextField
            variant='outlined'
            label='City'
            fullWidth
            required
            value={businessData?.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            error={!!errors.city}
            helperText={errors.city}
          />
          <TextField
            variant='outlined'
            label='Street'
            fullWidth
            value={businessData?.street}
            required
            onChange={(e) => handleInputChange('street', e.target.value)}
            error={!!errors.street}
            helperText={errors.street}
          />
          <TextField
            variant='outlined'
            label='House number'
            fullWidth
            required
            value={businessData?.houseNumber}
            onChange={(e) => handleInputChange('houseNumber', e.target.value)}
            error={!!errors.houseNumber}
            helperText={errors.houseNumber}
          />
          <TextField
            variant='outlined'
            label='Floor'
            fullWidth
            value={businessData?.floor}
            onChange={(e) => handleInputChange('floor', e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Apartment number'
            fullWidth
            value={businessData?.apartment}
            onChange={(e) => handleInputChange('apartment', e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Instagram account name'
            fullWidth
            value={businessData?.instagram}
            onChange={(e) => handleInputChange('instagram', e.target.value)}
          />
          <TextField
            variant='outlined'
            label='Facebook account name'
            fullWidth
            value={businessData?.facebook}
            onChange={(e) => handleInputChange('facebook', e.target.value)}
          />
        </Stack>

        {/* Working Time Section */}
        <Typography variant='h5'>BUSINESS HOURS</Typography>
        <Stack spacing={2} mb={4} alignItems='center'>
          <Typography>Select working days</Typography>
          <Stack direction='row' spacing={2} flexWrap='wrap'>
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
          <Stack spacing={2} alignItems='center'>
            <Typography>Select working hours</Typography>
            <Stack direction='row' spacing={2} flexWrap='wrap'>
              <TextField
                label='From hour'
                type='time'
                value={workingHours.from}
                onChange={(e) =>
                  setWorkingHours({ ...workingHours, from: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label='Until hour'
                type='time'
                value={workingHours.to}
                onChange={(e) =>
                  setWorkingHours({ ...workingHours, to: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </Stack>
        </Stack>

        {/* Services Section */}
        <Typography variant='h5'>SERVICES</Typography>
        <Stack spacing={2} mb={4}>
          {services.map((service, index) => (
            <Stack key={index} direction='row' spacing={2} alignItems='center'>
              <TextField
                label='service name'
                variant='outlined'
                value={service.name}
                onChange={(e) =>
                  handleServiceChange(index, 'name', e.target.value)
                }
              />
              <TextField
                label='price'
                variant='outlined'
                type='number'
                value={service.price}
                onChange={(e) =>
                  handleServiceChange(index, 'price', e.target.value)
                }
              />
              <TextField
                label='minutes'
                variant='outlined'
                type='number'
                value={service.time}
                onChange={(e) =>
                  handleServiceChange(index, 'time', e.target.value)
                }
              />
              <IconButton onClick={() => removeService(index)}>
                <RemoveCircleIcon />
              </IconButton>
            </Stack>
          ))}
          <Button
            startIcon={<AddCircleIcon />}
            onClick={addService}
            variant='contained'
          >
            add service
          </Button>
        </Stack>

        {/* Submit Button */}
        <Stack alignItems='center'>
          <Button
            variant='contained'
            color='primary'
            sx={{ width: '200px' }}
            onClick={() => {
              if (userId) {
                handleUpdate();
                return;
              }
              handleRegister();
            }}
          >
            {isLoading ? (
              <CircularProgress
                size={24}
                sx={{ color: 'white' }}
              ></CircularProgress>
            ) : userId ? (
              'save changes'
            ) : (
              'registration'
            )}
          </Button>
        </Stack>
      </FrostedBackground>
      {/* Snackbar with Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={10000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SignUpPage;
