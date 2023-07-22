import axios from "axios";
import { loadToken } from "src/utils/token";

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

export default api;
