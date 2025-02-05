const admin = require('firebase-admin'); // Assuming firebase-admin is initialized

const db = admin.firestore();

const getTodayAppointments = async (req, res) => {
  const { date, businessId } = req.body;
  try {
    // Query the appointments collection
    const appointmentsQuerySnapshot = await db
      .collection('appointments')
      .where('date', '==', date) // Filter by date
      .where('businessId', '==', businessId) // Filter by businessId
      .get();

    // Extract data from the query snapshot
    const appointments = [];
    appointmentsQuerySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });

    // Return the appointments in the response
    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);

    // Error handling
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching appointments.',
    });
  }
};
const getAllAppointments = async (req, res) => {
  const { businessId } = req.body;
  try {
    // Query the appointments collection
    const appointmentsQuerySnapshot = await db
      .collection('appointments')
      .where('businessId', '==', businessId) // Filter by businessId
      .get();

    // Extract data from the query snapshot
    const appointments = [];
    appointmentsQuerySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });

    // Return the appointments in the response
    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);

    // Error handling
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching appointments.',
    });
  }
};

const getAppointment = async (req, res) => {
  const { appointmentId } = req.body; // Extract appointmentId from the request body
  try {
    // Fetch the specific appointment by its ID
    const appointmentDoc = await db
      .collection('appointments')
      .doc(appointmentId)
      .get();

    if (!appointmentDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found.',
      });
    }

    // Return the appointment data in the response
    return res.status(200).json({
      success: true,
      data: { id: appointmentDoc.id, ...appointmentDoc.data() },
    });
  } catch (error) {
    console.error('Error fetching the appointment:', error);

    // Error handling
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the appointment.',
    });
  }
};

const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  try {
    // Delete the appointment from Firestore
    await db.collection('appointments').doc(appointmentId).delete();

    // Return a success response
    return res.status(200).json({
      success: true,
      message: 'Appointment canceled successfully.',
    });
  } catch (error) {
    console.error('Error canceling appointment:', error);

    // Error handling
    return res.status(500).json({
      success: false,
      message: 'An error occurred while canceling the appointment.',
    });
  }
};

module.exports = {
  getTodayAppointments,
  getAllAppointments,
  cancelAppointment,
  getAppointment,
};
