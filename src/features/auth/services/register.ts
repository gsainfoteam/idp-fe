import parsePhoneNumber from 'libphonenumber-js';

import { RegisterFormSchema } from '../hooks/use-register-form';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

export const register = async (
  requestBody: RegisterFormSchema &
    paths['/user']['post']['requestBody']['content']['application/json'],
) => {
  const parsedPhoneNumber = parsePhoneNumber(requestBody.phoneNumber, 'KR');

  if (!parsedPhoneNumber) {
    throw new Error('Invalid phone number');
  }

  const modifiedRequestBody = {
    ...requestBody,
    phoneNumber: parsedPhoneNumber.number,
  };

  const res = await api.POST('/user', { body: modifiedRequestBody });
  if (res.error || !res.data) throw res.error;
  return res.data;
};
