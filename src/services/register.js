import axios from 'axios';

const baseUrl = 'http://localhost:3001/register';

const register = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

const exports = {
  register,
};

export default exports;
