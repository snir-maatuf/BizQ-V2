const express = require('express');
const { scheduleAppointment } = require('../services/ScheduleAppointmentService');

const router = express.Router();

router.post('/', scheduleAppointment);

module.exports = router;
