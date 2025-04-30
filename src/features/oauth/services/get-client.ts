import { AxiosError } from 'axios';

import { api } from '@/features/core';

export type ClientResponse = NonNullable<
  Awaited<ReturnType<typeof getClientPublic>>
>;

export const getClientPublic = async (clientId: string) => {
  try {
    const res = await api.GET('/client/{clientId}/public', {
      params: { path: { clientId } },
    });
    if (res.error || !res.data) throw res.error;
    return res.data;
  } catch (error) {
    // TODO: error handling
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 401:
          console.error('인증 실패', error); // TODO: translation
          break;
        case 500:
          console.error('서버 오류', error); // TODO: translation
          break;
        default:
          console.error(error);
      }
    } else {
      console.error(error);
    }
    throw error;
  }
};
