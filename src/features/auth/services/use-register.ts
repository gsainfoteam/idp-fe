import parsePhoneNumber from 'libphonenumber-js';

import { RegisterFormSchema } from '../hooks/use-register-form';

import { VerifyResponse } from './get-token';

import { api } from '@/features/core';

export const register = async (
  requestBody: RegisterFormSchema & VerifyResponse,
) => {
  // const { t } = useTranslation();
  // createSchema(t).

  const parsedPhoneNumber = parsePhoneNumber(requestBody.phoneNumber, 'KR');

  if (!parsedPhoneNumber) {
    throw new Error('Invalid phone number');
  }

  const modifiedRequestBody = {
    ...requestBody,
    phoneNumber: parsedPhoneNumber.number,
  };

  const res = await api.post<void>('/user', modifiedRequestBody);
  return res.data;
};
