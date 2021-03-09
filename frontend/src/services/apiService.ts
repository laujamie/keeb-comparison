import axios from 'axios';
import { getIdToken } from '../services/firebaseService';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const authApiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

authApiClient.interceptors.request.use(
  async (config) => {
    const token = await getIdToken();
    if (!token) throw Error('User is not authenticated');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
