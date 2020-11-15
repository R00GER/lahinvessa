import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const getValidatedLocations = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const getPendingLocations = async () => {
  const response = await axios.get(`${baseUrl}/pending-locations`);
  return response.data;
}

const createNewLocation = async (newLocation) => {
  const response = await axios.post(`${baseUrl}/pending-locations`, newLocation);
  return response.data;
}

export default { getValidatedLocations, getPendingLocations, createNewLocation };