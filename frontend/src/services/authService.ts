import { authApiClient } from './apiService';

export const initializeUser = () => {
  return authApiClient.post('/user/new');
};
