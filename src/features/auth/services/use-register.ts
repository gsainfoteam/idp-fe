import { RegisterFormSchema } from '../hooks/use-register-form';

import { VerifyResponse } from './get-token';

import { api } from '@/features/core';

export const register = async (
  requestBody: RegisterFormSchema & VerifyResponse,
) => {
  const matched = requestBody.phoneNumber.match(
    /^(\+\d{1,2})?\s?\(?(\d{3})\)?[\s.-]?(\d{3,4})[\s.-]?(\d{4})$/,
  )!;

  const modifiedRequestBody = {
    ...requestBody,
    phoneNumber: matched.slice(1, 5).join(''),
  };

  const res = await api.post<void>('/user', modifiedRequestBody);
  return res.data;
};
