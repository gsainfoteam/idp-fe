import { api } from '@/features/core';
import { ScopeType } from '@/routes/_auth-required/authorize';

interface UserConsent {
  clientUuid: string;
  scopes: ScopeType[];
  createdAt: string;
  updatedAt: string;
  client: {
    name: string;
    uuid: string;
    scopes: ScopeType[];
    optionalScopes: ScopeType[];
  };
}

export interface UserConsentResponse {
  list: UserConsent[];
}

export const getUserConsent = async () => {
  const res = await api.get<UserConsentResponse>('/user/consent');
  return res.data;
};
