import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum UserConsentStatus {
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export const getUserConsent = async () => {
  try {
    const { data } = await api.GET('/user/consent');

    return { data };
  } catch (err) {
    const status = (err as Response).status as Extract<
      keyof paths['/user/consent']['get']['responses'],
      ErrorStatus
    >;

    return {
      status: UserConsentStatus[status] as keyof typeof UserConsentStatus,
    };
  }
};
