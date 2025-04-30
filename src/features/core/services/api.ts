import axios from 'axios';

import { useToken } from '@/features/auth';

export const api = axios.create({
  baseURL: 'https://api.stg.idp.gistory.me',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useToken.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config.url === '/auth/refresh') return error;
    if (error.response.status === 401 && !error.config._retry) {
      const refreshRes = await api
        .post<{ accessToken: string }>('/auth/refresh', {})
        .catch(() => null);
      if (refreshRes) {
        useToken.getState().saveToken(refreshRes.data.accessToken);
        error.config._retry = true;
        return api.request(error.config);
      }
    }

    useToken.getState().saveToken(null);
    return Promise.reject(error);
  },
);
