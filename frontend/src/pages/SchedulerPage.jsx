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
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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

  // Customized appointment with cancel button in Day view
  const CustomAppointment = ({ children, data, ...restProps }) => {
    const handleClick = () => {
      setCurrentDate(data.startDate);
      setCurrentViewName('Day');
    };
    const handleCancel = async (id) => {
      if (window.confirm('Cancel this appointment?')) {
        try {
          const res = await cancelAppointment(id);
          if (res.success) {
            setSchedulerData((prev) => prev.filter((appt) => appt.id !== id));
          } else throw new Error('Cancellation failed');
        } catch {
          alert('Failed to cancel.');
        }
      }
    };
    return (
      <Appointments.Appointment {...restProps} onClick={handleClick}>
        <div style={{ position: 'relative', padding: 12 }}>
          {children}
          {currentViewName === 'Day' && (
            <Button
              size="small"
              color="error"
              variant="contained"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                textTransform: 'none',
                fontSize: '0.75rem',
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleCancel(data.id);
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </Appointments.Appointment>
    );
  };

  // Clickable month-cell to switch to Day view
  const CustomTimeTableCell = ({ startDate, ...restProps }) => {
    const handleCellClick = () => {
      setCurrentDate(startDate);
      setCurrentViewName('Day');
    };
    return (
      <MonthView.TimeTableCell
        {...restProps}
        startDate={startDate}
        onClick={handleCellClick}
        style={{ cursor: 'pointer' }}
      />
    );
  };

  // Fetch and shape appointments once on mount / login change
  useEffect(() => {
    getAllAppointments(isLoggedIn).then(({ data }) => {
      setSchedulerData(
        data.map((appt) => ({
          ...appt,
          title: `${appt.clientName} - ${appt.service}`,
        }))
      );
    });
  }, [isLoggedIn]);

  return (
    <Stack alignItems="center" spacing={2} sx={{ position: 'relative', height: '80vh' }}>
      <FrostedBackground>
        {/* Edit Business Button */}
        <Button
          disableElevation
          startIcon={<EditIcon />}
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate(`/signup/${isLoggedIn}`)}
          sx={{
            mt: 4,
            px: 4,
            py: 1.5,
            borderRadius: '30px',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: '200% 200%',
            color: '#fff',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundPosition: '100% 0%',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 30px rgba(0,0,0,0.3)',
            },
          }}
        >
          Edit Business
        </Button>

        {/* Back to Month View */}
        {currentViewName !== 'Month' && (
          <Button
            onClick={() => setCurrentViewName('Month')}
            variant="outlined"
            sx={{
              position: 'absolute',
              top: 16,
              right: 24,
              borderRadius: '20px',
              textTransform: 'none',
            }}
          >
            Monthly View
          </Button>
        )}

        {/* Calendar */}
        <Paper sx={{ mt: 6, width: '90%', height: '100%', overflowY: 'auto' }}>
          <Scheduler data={schedulerData} height={600}>
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={setCurrentDate}
              currentViewName={currentViewName}
              onCurrentViewNameChange={setCurrentViewName}
            />
            {currentViewName === 'Month' ? (
              <MonthView timeTableCellComponent={CustomTimeTableCell} />
            ) : (
              <DayView startDayHour={6} endDayHour={22} />
            )}
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments appointmentComponent={CustomAppointment} />
          </Scheduler>
        </Paper>
      </FrostedBackground>
    </Stack>
  );
};

export default SchedulerPage;
