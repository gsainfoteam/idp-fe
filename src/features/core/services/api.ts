import axios from 'axios';

import { useToken } from '@/features/auth';

export const api = axios.create({
  baseURL: 'https://api.stg.idp.gistory.me',
});

api.interceptors.request.use((config) => {
  const token = useToken.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((response) => {
  return response;
});
