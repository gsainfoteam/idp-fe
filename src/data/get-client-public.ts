import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

export const getClientPublic = async (clientId: string) => {
  const { data, error, response } = await api.GET('/client/{clientId}/public', {
    params: { path: { clientId } },
  });

  if (error || !data) {
    const status = response.status as Extract<
      keyof paths['/client/{clientId}/public']['get']['responses'],
      ErrorStatus
    >;

    return { error, status };
  }

  return { data };
};
