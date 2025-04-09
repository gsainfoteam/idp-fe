import { AxiosError } from 'axios';

import { ScopeType } from '../hooks/use-authorize-form';

import { api } from '@/features/core';

export interface GetClientResponse {
  clientId: string;
  name: string;
  urls: string[];
  createdAt: string;
  updatedAt: string;
  scopes: ScopeType[];
  optionalScopes: ScopeType[];
  idTokenAllowed: boolean;
}

export const getClient = async (clientId: string) => {
  try {
    const res = await api.get<GetClientResponse>(`/client/${clientId}`);
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
