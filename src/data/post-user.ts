import parsePhoneNumber from 'libphonenumber-js';
import type { ErrorStatus } from 'openapi-typescript-helpers';

import { RegisterFormSchema } from '../features/auth/hooks/use-register-form';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum UserStatus {
  INVALID_TOKEN = 403,
  USER_ALREADY_EXISTS = 409,
  SERVER_ERROR = 500,
}

export const postUser = async (
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

  const { data, error, response } = await api.POST('/user', {
    body: modifiedRequestBody,
  });

  if (error || !data) {
    const status = response.status as Extract<
      keyof paths['/user']['post']['responses'],
      ErrorStatus
    >;

    return { error, status: UserStatus[status] as keyof typeof UserStatus };
  }

  return { data };
};
