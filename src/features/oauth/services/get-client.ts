import { AxiosError } from 'axios';

import { ScopeType } from '../hooks/use-authorize-form';

import { api } from '@/features/core';

export interface ClientResponse {
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
    const res = await api.get<ClientResponse>(`/client/${clientId}`);
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
