import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import dayjs from 'dayjs';
import { getAllTodayAppointments } from '../../api/Appointment';

const AppointmentTimeSelection = ({
  selectedDate,
  selectedTime,
  onTimeSelect,
  businessData,
  appointmentData,
}) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      setIsLoading(true);
      try {
        // Validate inputs
        if (!selectedDate || !businessData?.userId) {
          throw new Error('Missing required data for scheduling.');
        }

        // Fetch scheduled appointments
        const response = await getAllTodayAppointments(
          selectedDate,
          businessData.userId
        );
        const scheduledAppointments = response?.data || [];

        // Convert scheduled appointments to dayjs objects
        const scheduledTimes = scheduledAppointments.map((appointment) => {
          // Parse startDate and endDate with selectedDate (DD/MM/YYYY)
          const startDate = dayjs(
            `${selectedDate} ${dayjs(appointment.startDate).format('H:mm')}`,
            'DD/MM/YYYY H:mm'
          );
          const endDate = dayjs(
            `${selectedDate} ${dayjs(appointment.endDate).format('H:mm')}`,
            'DD/MM/YYYY H:mm'
          );
          return { startDate, endDate };
        });

        // Get appointment duration and working hours
        const appointmentDuration = Number(
          businessData?.services[appointmentData.typeId]?.time
        ); // in minutes
        const { from, to } = businessData?.workingHours;

        // Validate working hours
        if (!from || !to) {
          throw new Error('Invalid working hours.');
        }

        // Construct startTime and endTime with full date context
        const startTime = dayjs(`${selectedDate} ${from}`, 'DD/MM/YYYY H:mm');
        const endTime = dayjs(`${selectedDate} ${to}`, 'DD/MM/YYYY H:mm');

        // Check if the selected date is today
        const isToday = dayjs(selectedDate, 'DD/MM/YYYY').isSame(
          dayjs(),
          'day'
        );

        // Generate all time slots
        let hours = [];
        let currentTime = startTime;
        while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
          hours.push(currentTime.format('H:mm'));
          currentTime = currentTime.add(30, 'minute');
        }

        // Filter available time slots
        const availableTimes = hours.filter((hour) => {
          const intervalStart = dayjs(
            `${selectedDate} ${hour}`,
            'DD/MM/YYYY H:mm'
          );
          const intervalEnd = intervalStart.add(appointmentDuration, 'minute');

          // If it's today, exclude past times
          if (isToday && intervalStart.isBefore(dayjs())) {
            return false;
          }

          // Check if interval overlaps with any scheduled appointments
          return !scheduledTimes.some(
            ({ startDate, endDate }) =>
              intervalStart.isBefore(endDate) && intervalEnd.isAfter(startDate)
          );
        });

        setAvailableTimes(availableTimes);
      } catch (error) {
        console.error('Error fetching appointment times:', error.message);
        setAvailableTimes([]); // Ensure empty state on error
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedDate && businessData?.userId) {
      fetchAvailableTimes();
    }
  }, [selectedDate, businessData, appointmentData]);

  return (
    <Stack alignItems='center' justifyContent='center' spacing={3}>
      <Typography variant='h4' textAlign='center'>
        Choose Time
      </Typography>
      <Typography variant='h6' textAlign='center'>
        {selectedDate}
      </Typography>
      {isLoading ? (
        <CircularProgress sx={{ fontSize: '30px', color: 'black' }} />
      ) : (
        <Grid container spacing={2} justifyContent='center'>
          {availableTimes.map((time) => (
            <Grid item key={time}>
              <Button
                variant='contained'
                style={{
                  backgroundColor:
                    selectedTime === time ? '#1976d2' : '#808080',
                }}
                onClick={() => onTimeSelect(time)}
              >
                {time}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default AppointmentTimeSelection;
