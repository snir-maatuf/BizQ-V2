import React, { useEffect, useState } from 'react';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';
import WestIcon from '@mui/icons-material/West';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { ViewState } from '@devexpress/dx-react-scheduler';
import FrostedBackground from '../features/Generics/FrostedBackground';
import { useIsLoggedIn } from '../utils/auth';
import { cancelAppointment, getAllAppointments } from '../api/Appointment';
import { useNavigate } from 'react-router-dom';

const SchedulerPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentViewName, setCurrentViewName] = useState('Month');
  const [schedulerData, setSchedulerData] = useState([]);
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const CustomAppointment = ({ children, data, ...restProps }) => {
    const handleClick = () => {
      setCurrentDate(data?.startDate); // Change to the clicked day
      setCurrentViewName('Day');
    };

    const handleCancelAppointment = async (appointmentId) => {
      if (window.confirm(`Are you sure you want to cancel the appointment?`)) {
        try {
          const result = await cancelAppointment(appointmentId);

          if (result.success) {
            alert('Appointment Cancelled Successfully');
            // Optionally, refresh appointments data
            setSchedulerData((prevData) =>
              prevData.filter((appointment) => appointment.id !== appointmentId)
            );
          } else {
            alert(`Error occured, Please try to cancel the appointment again`);
          }
        } catch (error) {
          console.log(`An error occurred: ${error.message}`);
        }
      }
    };

    return (
      <Appointments.Appointment {...restProps} onClick={handleClick}>
        <div style={{ position: 'relative', padding: '10px' }}>
          {children}
          {currentViewName === 'Day' && (
            <Button
              size='small'
              color='error'
              variant='contained'
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the appointment click event
                handleCancelAppointment(data?.id);
              }}
            >
              Cancel appointment
            </Button>
          )}
        </div>
      </Appointments.Appointment>
    );
  };

  const CustomTimeTableCell = ({ startDate, ...restProps }) => {
    const handleDayClick = () => {
      console.log(startDate);
      setCurrentDate(startDate); // Change to the clicked day
      setCurrentViewName('Day'); // Switch to Day view
    };

    return (
      <MonthView.TimeTableCell
        {...restProps}
        startDate={startDate}
        onClick={handleDayClick}
        style={{ cursor: 'pointer' }}
      />
    );
  };
  useEffect(() => {
    getAllAppointments(isLoggedIn).then((data) => {
      const updatedData = data?.data?.map((appointment) => ({
        ...appointment,
        title: `${appointment.clientName} - ${appointment.service}`, // Customize the title as needed
      }));

      console.log(updatedData);
      setSchedulerData(updatedData);
    });
  }, []);
  return (
    <Stack alignItems={'center'} spacing={1} sx={{ height: '80vh' }}>
      <FrostedBackground>
          <Button
            variant='contained'
            sx={{ backgroundColor: 'blue', borderRadius: '30px' }}
            onClick={() => {
              navigate(`/signup/${isLoggedIn}`);
            }}
          >
            <Typography variant='h5' sx={{ textTransform: 'none' }}>Edit Business</Typography>
          </Button>
          <br></br>

          {currentViewName !== 'Month' && (
            <Button
              sx={{
                position: 'absolute',
                right: '60px',
                top: '30px',
                zIndex: '9999',
              }}
              onClick={() => {
                setCurrentViewName('Month');
              }}
              variant='contained'
            >
              Monthly view{' '}
            </Button>
          )}
          <Stack sx={{ backgroundColor: 'white', overflowY: 'auto' }}>
            <Scheduler data={schedulerData}>
              <ViewState
                currentDate={currentDate} // Dynamically bind currentDate
                onCurrentDateChange={(newDate) => setCurrentDate(newDate)} // Update state when toolbar changes the date
                currentViewName={currentViewName}
                onCurrentViewNameChange={(newViewName) =>
                  setCurrentViewName(newViewName)
                } // Update state when the view changes
              />
              {currentViewName === 'Month' ? (
                <MonthView timeTableCellComponent={CustomTimeTableCell} />
              ) : (
                <DayView startDayHour={6} endDayHour={22} />
              )}{' '}
              <Toolbar />
              <DateNavigator />
              <TodayButton />
              <Appointments appointmentComponent={CustomAppointment} />
            </Scheduler>
          </Stack>
      </FrostedBackground>
    </Stack>
  );
};

export default SchedulerPage;
