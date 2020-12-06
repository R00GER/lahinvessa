import axios from 'axios';

// const baseUrl = '/api/login';
const baseUrl = 'http://localhost:3001/api/login';

const login = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

const exports = {
  login,
};

export default exports;
