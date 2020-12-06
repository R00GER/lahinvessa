import axios from 'axios';

// const baseUrl = '/api/locations';
const baseUrl = 'http://localhost:3001/api/locations';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getValidatedLocations = async () => {
  const response = await axios.get(baseUrl);
  console.log(response);
  return response.data;
};

const getPendingLocations = async () => {
  const response = await axios.get(`${baseUrl}/pending`);

  return response.data;
};

const createNewLocation = async (newLocation) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${baseUrl}/pending`, newLocation, config);
  return response.data;
};

const updateLocation = async (location) => {
  const response = await axios.put(`${baseUrl}/${location.id}`, location);
  console.log('response from service', response.data);
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
