const express = require('express');
const {
  getTodayAppointments,
  getAllAppointments,
  cancelAppointment,
  getAppointment,
} = require('../services/Appointments');

const router = express.Router();

router.post('/getTodayAppointments', getTodayAppointments);
router.post('/getAllAppointments', getAllAppointments);
router.post('/getAppointment', getAppointment);

router.post('/cancelAppointment', cancelAppointment);

module.exports = router;
