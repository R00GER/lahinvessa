import axios from 'axios';

const baseUrl = 'http://localhost:3001';

let token = null;

const setToken = (newToken) => {
  console.log(newToken);
  token = `bearer ${newToken}`;
};

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
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${baseUrl}/pending-locations`, newLocation, config);
  return response.data;
};

const updateLocation = async (location) => {
  const response = await axios.put(`${baseUrl}/locations/${location.id}`, location);
  return response.data;
};

const exports = {
  setToken,
  getValidatedLocations,
  getPendingLocations,
  createNewLocation,
  updateLocation,
};

export default exports;
