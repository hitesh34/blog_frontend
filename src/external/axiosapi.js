// external/axiosApi.js
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000'; // Base URL of your Django backend

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
