// external/axiosApi.js
import axios from 'axios';

const baseURL = 'https://squid-app-mqw69.ondigitalocean.app'; // Updated base URL for your DigitalOcean deployed backend

const baseConfig = {
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
};

export const axiosInstance = axios.create({
  ...baseConfig,
  withCredentials: true,
});

export const axiosInstanceWOCredentials = axios.create({
  ...baseConfig,
  withCredentials: false,
});
