import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const login = async (user) => {
  const response = await axios.post(`${baseUrl}/login`, user);
  return response.data;
};

const exports = {
  login,
};

export default exports;
