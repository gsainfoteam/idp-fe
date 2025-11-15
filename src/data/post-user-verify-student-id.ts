import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum UserVerifyStudentIdStatus {
  USER_NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const postUserVerifyStudentId = async (
  requestBody: paths['/user/verify/studentId']['post']['requestBody']['content']['application/json'],
) => {
  try {
    await api.POST('/user/verify/studentId', {
      body: requestBody,
    });

    return {};
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/user/verify/studentId']['post']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in UserVerifyStudentIdStatus
            ? (UserVerifyStudentIdStatus[
                status
              ] as keyof typeof UserVerifyStudentIdStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
