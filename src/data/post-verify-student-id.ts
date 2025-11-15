import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum VerifyStudentIdStatus {
  USER_NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const postVerifyStudentId = async (
  requestBody: paths['/verify/studentId']['post']['requestBody']['content']['application/json'],
) => {
  try {
    const { data } = await api.POST('/verify/studentId', {
      body: requestBody,
    });

    return { data };
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/verify/studentId']['post']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in VerifyStudentIdStatus
            ? (VerifyStudentIdStatus[
                status
              ] as keyof typeof VerifyStudentIdStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
