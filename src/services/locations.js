import axios from 'axios';

const baseUrl = 'https://herokuapp.lahinvessa.com/api/locations';

let token = null;

const setToken = (newToken) => {
  console.log(newToken);
  token = `bearer ${newToken}`;
};

const getValidatedLocations = async () => {
  console.log(baseUrl);
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

const getPendingLocations = async () => {
  const response = await axios.get(`${baseUrl}/pending`);
  console.log(response.data);
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
