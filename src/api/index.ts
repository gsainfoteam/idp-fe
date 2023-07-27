import axios from "axios";
import { loadToken, saveToken } from "src/utils/token";

import { refreshToken } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const tokens = loadToken();
  if (!tokens) return config;
  const { accessToken } = tokens;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (success) => success,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { accessToken } = await refreshToken();
      saveToken({ accessToken });
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
