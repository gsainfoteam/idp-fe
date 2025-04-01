import { RegisterFormSchema } from '../hooks/use-register-form';

import { api } from '@/features/core';

interface RegisterResponse {
  accessToken: string;
}

export const register = async (requestBody: RegisterFormSchema) => {
  const modifiedRequestBody = {
    ...requestBody,
    phoneNumber: requestBody.phoneNumber.replace(/-/g, ''),
  };

  const res = await api.post<RegisterResponse>('/user', modifiedRequestBody);
  return res.data;
};
