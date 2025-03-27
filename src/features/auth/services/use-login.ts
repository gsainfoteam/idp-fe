import { api } from '@/features/core';

interface LoginResponse {
  accessToken: string;
}

export const login = async (requestBody: {
  email: string;
  password: string;
}) => {
  const res = await api.post<LoginResponse>('/auth/login', requestBody);
  return res.data;
};
