import { useMemo } from 'react';

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

  const currentUserRoleNumber = useMemo(
    () =>
      getRoleNumber(
        members?.find((member) => member.email === user?.email)
          ?.memberships?.[0]?.role ?? null,
      ),
    [user, members],
  );

  return { members, currentUserRoleNumber, isLoading, error, refetch };
};
