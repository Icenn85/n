import axios from 'axios';

axios.defaults.baseURL = '';

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const logInApi = async user => {
  const { data } = await axios.post('/auth/login', user);
  token.set(data.token);
  return data;
};

export const registerApi = async user => {
  const { data } = await axios.post('/auth/register', user);
  return data;
};