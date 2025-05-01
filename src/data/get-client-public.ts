import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum ClientPublicStatus {
  INVALID_REQUEST = 400,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export const getClientPublic = async (clientId: string) => {
  const { data, error, response } = await api.GET('/client/{clientId}/public', {
    params: { path: { clientId } },
  });

  if (error || !data) {
    const status = response.status as Extract<
      keyof paths['/client/{clientId}/public']['get']['responses'],
      ErrorStatus
    >;

    return {
      error,
      status: ClientPublicStatus[status] as keyof typeof ClientPublicStatus,
    };
  }

  return { data };
};
