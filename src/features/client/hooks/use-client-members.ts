import { useCallback, useMemo } from 'react';

import { getRoleNumber } from '../utils/role';

import { useAuth } from '@/features/auth';
import { $api } from '@/features/core';

export const useClientMembers = (clientId: string) => {
  const { user } = useAuth();
  const {
    data: members,
    isLoading,
    error,
    refetch,
  } = $api.useQuery('get', '/client/{clientId}/members', {
    params: { path: { clientId } },
  });

  const getMemberRole = useCallback(
    (uuid?: string) =>
      getRoleNumber(
        members?.find((member) => member.uuid === uuid)?.memberships?.[0]
          ?.role ?? null,
      ),
    [members],
  );

  const currentUserRoleNumber = useMemo(
    () => getMemberRole(user?.uuid),
    [user?.uuid, getMemberRole],
  );

  return {
    members,
    getMemberRole,
    currentUserRoleNumber,
    isLoading,
    error,
    refetch,
  };
};
