import axios from 'axios';

/**
 * Uses Axois to call Google Geocoding api in order to get latitude and longitude coordinates
 * @param {string} location - Location Address
 * @returns {object} Latitude and Longitude of given location
 */

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

    // Returning only to coordinate information
    return response.data.results[0].geometry.location;
  } catch (error) {
    console.error(error);
  }
}
