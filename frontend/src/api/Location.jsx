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

// Dedupe: the IP geolocation APIs are rate-limited and several places ask for
// the location on load. Resolve it once per page load and share the result.
let inFlight = null;
let resolved = null;

async function lookup() {
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
    if (locationData.city) localStorage.setItem('currentCity', locationData.city);
    return locationData;
  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
}

export async function getLocationByIP() {
  if (resolved) return resolved;
  if (!inFlight) {
    inFlight = lookup().then((data) => {
      resolved = data;
      inFlight = null;
      return data;
    });
  }
  return inFlight;
}
