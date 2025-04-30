import { ScopeType } from '../hooks/use-authorize-form';

import { api } from '@/features/core';

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
