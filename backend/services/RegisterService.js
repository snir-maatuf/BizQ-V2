const admin = require('firebase-admin'); // Assuming you have initialized firebase-admin

const db = admin.firestore();

const registerBusiness = async (req, res) => {
  const businessData = req.body;
  const { email, password, ...businessDetails } = businessData;

  try {
    // Step 1: Create a new user with Firebase Authentication
    const userCredential = await admin.auth().createUser({
      email,
      password,
    });

    // Step 2: Store business data in Firestore
    const userId = userCredential.uid;
    const businessRef = db.collection('businesses').doc(userId);

    const response = await businessRef.set({
      ...businessDetails,
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ success: true, data: { userId } });
  } catch (error) {
    console.error('Error registering business:', error);

    // Custom error handling
    let statusCode = 500; // Default to internal server error
    let errorMessage = 'An unexpected error occurred.';

    if (error.code === 'auth/email-already-exists') {
      statusCode = 409; // Conflict
      errorMessage = 'The email address is already in use.';
    } else if (error.code === 'auth/invalid-email') {
      statusCode = 400; // Bad request
      errorMessage = 'The provided email is invalid.';
    } else if (error.code === 'auth/weak-password') {
      statusCode = 400; // Bad request
      errorMessage = 'The provided password is too weak.';
    } else if (error.message.includes('PERMISSION_DENIED')) {
      statusCode = 403; // Forbidden
      errorMessage = 'You do not have permission to perform this operation.';
    }

    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
    }); // Pass the error with code and message
  }
};

module.exports = {
  registerBusiness,
};
