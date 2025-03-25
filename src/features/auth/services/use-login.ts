import { api } from '@/features/core';

interface LoginResponse {
  accessToken: string;
}

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await api.post<LoginResponse>('/auth/login', { email, password });
  return res.data;
};
