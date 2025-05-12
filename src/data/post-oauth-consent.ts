import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum OauthConsentStatus {
  SERVER_ERROR = 500,
}

export const postOauthConsent = async (
  requestBody: paths['/oauth/consent']['post']['requestBody']['content']['application/json'],
) => {
  try {
    await api.POST('/oauth/consent', {
      body: requestBody,
    });

    return {};
  } catch (err) {
    if (err instanceof Response) {
      const status = err.status as Extract<
        keyof paths['/oauth/consent']['post']['responses'],
        ErrorStatus
      >;

      return {
        status:
          status in OauthConsentStatus
            ? (OauthConsentStatus[status] as keyof typeof OauthConsentStatus)
            : ('UNKNOWN_ERROR' as const),
      };
    }

    return {
      status: 'UNKNOWN_ERROR' as const,
    };
  }
};
