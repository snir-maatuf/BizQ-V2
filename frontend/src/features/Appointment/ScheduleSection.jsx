import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ScheduleSection = ({ selectedDate, onDateSelect, workingDays }) => {
  // Make sure selectedDate is a Dayjs object
  const selectedDateObj = dayjs(selectedDate, 'DD/MM/YYYY');

  const shouldDisableDate = (date) => {
    const isPastDate = dayjs().isAfter(date, 'day'); // Disable past dates
    const isWorkingDay = workingDays?.includes(date.day()); // Check if the date is a working day
    return isPastDate || !isWorkingDay; // Disable past dates or non-working days
  };

  return (
    <Stack spacing={-2} alignItems='center'>
      <Typography variant='h4'>Choose Date</Typography>
      <Stack sx={{ scale: '0.8' }} alignItems={'start'}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            value={selectedDateObj} // Pass Dayjs object
            onChange={(newValue) => {
              const formattedDate = dayjs(newValue).format('DD/MM/YYYY');
              onDateSelect(formattedDate); // Pass formatted date string to onDateSelect
            }}
            shouldDisableDate={shouldDisableDate} // Add this prop to disable past dates and non-working days
            slotProps={{
              textField: { variant: 'standard' },
            }}
            sx={{
              height: '400px',
              '& .Mui-selected': {
                backgroundColor: '#2196f3',
                color: '#ffffff',
              }, // Example: Customize selected date color
            }}
          />
        </LocalizationProvider>
      </Stack>
    </Stack>
  );
};

export default ScheduleSection;
