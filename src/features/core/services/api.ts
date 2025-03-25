import axios from 'axios';

import { getToken } from '@/features/auth';

export const api = axios.create({
  baseURL: 'https://api.stg.idp.gistory.me',
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
api.interceptors.response.use((response) => {
  return response;
});
