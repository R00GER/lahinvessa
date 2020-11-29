import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const getValidatedLocations = async () => {
  const response = await axios.get(`${baseUrl}/locations`);
  return response.data;
};

const getPendingLocations = async () => {
  const response = await axios.get(`${baseUrl}/pending-locations`);
  console.log(response.data);
  return response.data;
};

const createNewLocation = async (newLocation) => {
  const response = await axios.post(`${baseUrl}/pending-locations`, newLocation);
  return response.data;
};

const updateLocation = async (location) => {
  const response = await axios.put(`${baseUrl}/locations/${location.id}`, location);
  return response.data;
};

const exports = {
  getValidatedLocations,
  getPendingLocations,
  createNewLocation,
  updateLocation,
};

export default exports;
