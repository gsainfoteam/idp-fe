import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';
import type { ErrorStatus } from 'openapi-typescript-helpers';

enum AuthPasskeyVerifyStatus {
  INVALID_RESPONSE = 401,
  EMAIL_NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const postAuthPasskeyVerify = async (
  requestBody: paths['/auth/passkey/verify']['post']['requestBody']['content']['application/json'],
) => {
  try {
    const { data } = await api.POST('/auth/passkey/verify', {
      body: requestBody,
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/auth/passkey/verify']['post']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in AuthPasskeyVerifyStatus
            ? (AuthPasskeyVerifyStatus[
                status
              ] as keyof typeof AuthPasskeyVerifyStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
