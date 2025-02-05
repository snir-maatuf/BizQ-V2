const admin = require('firebase-admin'); // Assuming you have initialized firebase-admin

const db = admin.firestore();

const scheduleAppointment = async (req, res) => {
  const appointmentData = req.body;
  const { ...appointmentDetails } = appointmentData;

  try {
    // Step 1: Insert the appointment data into the "appointments" collection
    const appointmentRef = db.collection('appointments').doc(); // Auto-generate an ID
    const appointmentID = appointmentRef.id;

    await appointmentRef.set({
      ...appointmentDetails,
      appointmentID,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Step 2: Return a success response with the appointment ID
    return res.status(200).json({
      success: true,
      appointmentID,
    });
  } catch (error) {
    console.error('Error scheduling appointment:', error);

    // Custom error handling
    let statusCode = 500; // Default to internal server error
    let errorMessage = 'An unexpected error occurred.';

    if (error.message.includes('PERMISSION_DENIED')) {
      statusCode = 403; // Forbidden
      errorMessage = 'You do not have permission to perform this operation.';
    } else if (error.code === 'invalid-argument') {
      statusCode = 400; // Bad request
      errorMessage = 'Invalid appointment data provided.';
    }

    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }
};

module.exports = {
  scheduleAppointment,
};
