import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://thecaratcasa.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
});

export default axiosClient;
