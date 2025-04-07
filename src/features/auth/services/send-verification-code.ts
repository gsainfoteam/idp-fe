import { RegisterFormSchema } from '../hooks/use-register-form';

import { api } from '@/features/core';

interface SendVerificationRequestBody {
  email: RegisterFormSchema['email'];
}

export const sendVerificationCode = async (
  requestBody: SendVerificationRequestBody,
) => {
  const res = await api.post<void>('/verify/email', requestBody);
  return res.data;
};
