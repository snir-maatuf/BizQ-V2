const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const registerRoutes = require('./routers/RegisterRoute');
const scheduleAppointmentRoutes = require('./routers/ScheduleAppointmentRoute');
const appointmentsRoutes = require('./routers/Appointments');

// Firebase Admin initialization

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this domain
  methods: ['GET', 'POST'], // Allow only specific methods if needed
  allowedHeaders: ['Content-Type'], // Allow specific headers
};
app.use(cors(corsOptions));
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/register', registerRoutes);
app.use('/appointment', appointmentsRoutes);

app.use('/scheduleappointment', scheduleAppointmentRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).json({ error: 'Internal Server Error' });
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
