import axios from 'axios';

export const registerBusiness = async (businessData) => {
  try {
    const response = await axios.post(
      'http://localhost:5001/register',
      businessData
    );
    return response.data; // Success response
  } catch (error) {
    if (error.response) {
      // Server responded with an error
      const { status, data } = error.response;
      switch (status) {
        case 400:
          console.error('Bad Request:', data.message);
          break;
        case 403:
          console.error('Forbidden:', data.message);
          break;
        case 409:
          alert('This email is already registered in the system, try to connect or register with another one');
          break;
        case 500:
        default:
          console.error('Server Error:', data.message);
      }
      return { success: false, message: data.message, statusCode: status };
    } else if (error.request) {
      // No response from server
      console.error('No response received from the server.');
      return {
        success: false,
        message: 'No response received from the server.',
      };
    } else {
      // Other errors
      console.error('Unexpected Error:', error.message);
      return {
        success: false,
        message: 'An unexpected error occurred: ' + error.message,
      };
    }
  }
};
