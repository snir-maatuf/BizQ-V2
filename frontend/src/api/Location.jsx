import axios from 'axios';

async function getDeviceIP() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return null;
  }
}

export async function getLocationByIP() {
  const ip = await getDeviceIP();
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/?lang=he`);
    const locationData = {
      city: response.data.city,
      region: response.data.region,
      country: response.data.country_name,
      latitude: response.data.latitude,
      longitude: response.data.longitude,
    };
    localStorage.setItem('currentCity', locationData?.city);
    return locationData;
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
}
