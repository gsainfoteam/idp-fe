import parsePhoneNumber from 'libphonenumber-js';
import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum UserStatus {
  INVALID_TOKEN = 403,
  USER_ALREADY_EXISTS = 409,
  SERVER_ERROR = 500,
}

export const postUser = async (
  requestBody: paths['/user']['post']['requestBody']['content']['application/json'],
) => {
  const parsedPhoneNumber = parsePhoneNumber(requestBody.phoneNumber, 'KR');

  if (!parsedPhoneNumber) {
    throw new Error('Invalid phone number');
  }

  const modifiedRequestBody = {
    ...requestBody,
    phoneNumber: parsedPhoneNumber.number,
  };

  try {
    const { data } = await api.POST('/user', {
      body: modifiedRequestBody,
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user']['post']['responses'],
        ErrorStatus
      >;

      return {
        status: UserStatus[status] as keyof typeof UserStatus,
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
