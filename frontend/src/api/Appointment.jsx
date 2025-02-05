import axios from 'axios';

export const getAllTodayAppointments = async (date, businessId) => {
  try {
    const response = await axios.post(
      'http://localhost:5001/appointment/getTodayAppointments',
      { date, businessId }
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
export const getAllAppointments = async (businessId) => {
  try {
    const response = await axios.post(
      'http://localhost:5001/appointment/getAllAppointments',
      { businessId }
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

export const getAppointment = async (appointmentId) => {
  try {
    const response = await axios.post(
      'http://localhost:5001/appointment/getAppointment',
      { appointmentId }
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
export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await axios.post(
      `http://localhost:5001/appointment/cancelAppointment`,
      {
        appointmentId, // Include request body for DELETE
      }
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
