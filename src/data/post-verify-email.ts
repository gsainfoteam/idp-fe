import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum VerifyEmailStatus {
  SERVER_ERROR = 500,
}

export const postVerifyEmail = async (
  requestBody: paths['/verify/email']['post']['requestBody']['content']['application/json'],
) => {
  try {
    await api.POST('/verify/email', {
      body: requestBody,
    });

    return {};
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/verify/email']['post']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in VerifyEmailStatus
            ? (VerifyEmailStatus[status] as keyof typeof VerifyEmailStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
