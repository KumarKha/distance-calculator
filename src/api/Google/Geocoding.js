import axios from 'axios';

export async function getCoordinatesFromAddress(location) {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address: location,
          key: import.meta.env.VITE_GOOGLE_API_KEY,
        },
      }
    );
    let res = response.data.results[0].geometry.location;
    return res;
  } catch (error) {
    console.error(error);
  }
}
