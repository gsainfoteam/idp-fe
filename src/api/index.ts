import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN,
  withCredentials: true,
});

export default api;
