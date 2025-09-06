import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum UserPasskeyVerifyStatus {
  INVALID_RESPONSE = 401,
  EMAIL_NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const postUserPasskeyVerify = async (
  requestBody: paths['/user/passkey/verify']['post']['requestBody']['content']['application/json'],
) => {
  try {
    const { data } = await api.POST('/user/passkey/verify', {
      body: requestBody,
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user/passkey/verify']['post']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in UserPasskeyVerifyStatus
            ? (UserPasskeyVerifyStatus[
                status
              ] as keyof typeof UserPasskeyVerifyStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
