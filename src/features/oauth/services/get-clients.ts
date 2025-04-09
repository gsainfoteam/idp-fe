import { AxiosError } from 'axios';

import { GetClientResponse } from './get-client';

import { api } from '@/features/core';

export const getClients = async () => {
  try {
    const res = await api.get<GetClientResponse[]>('/client');
    return res.data;
  } catch (error) {
    // TODO: error handling
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 401:
          console.error('인증 실패', error);
          break;
        default:
          console.error('서버 오류', error);
      }
    } else {
      console.error(error);
    }
    throw error;
  }
};
