import type { ErrorStatus } from 'openapi-typescript-helpers';

import { paths } from '@/@types/api-schema';
import { api } from '@/features/core';

enum ClientStatus {
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

export const patchClientSecret = async (id: string) => {
  try {
    const { data } = await api.PATCH('/client/{clientId}/secret', {
      params: { path: { clientId: id } },
    });
    return { data };
  } catch (err) {
    const status = (err as Response).status as Extract<
      keyof paths['/client/{clientId}/secret']['patch']['responses'],
      ErrorStatus
    >;

    return {
      status: ClientStatus[status] as keyof typeof ClientStatus,
    };
  }
};
