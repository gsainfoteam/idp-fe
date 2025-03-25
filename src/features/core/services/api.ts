import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.stg.idp.gistory.me',
});

api.interceptors.request.use((config) => {
  return config;
});
api.interceptors.response.use((response) => {
  return response;
});
