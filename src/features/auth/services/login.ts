import { LoginFormSchema } from '../hooks/use-login-form';

import { api } from '@/features/core';

interface LoginResponse {
  accessToken: string;
}

export const login = async (requestBody: LoginFormSchema) => {
  const res = await api.post<LoginResponse>('/auth/login', requestBody);
  return res.data;
};
