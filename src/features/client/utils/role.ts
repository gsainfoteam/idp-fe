import { type components } from '@/@types/api-schema';

export type Role = components['schemas']['RoleDto']['role'];

export const ROLE_VALUES: Role[] = ['MEMBER', 'ADMIN', 'OWNER'];

export const ROLE_NUMBER: Record<Role, number> = {
  OWNER: 3,
  ADMIN: 2,
  MEMBER: 1,
};

export const getRoleNumber = (role: Role | null): number => {
  if (!role) return 0;
  return ROLE_NUMBER[role];
};

export const requiredRole = (role: Role, requiredRole: Role): boolean => {
  return getRoleNumber(role) >= getRoleNumber(requiredRole);
};

export const hasRoleAtLeast = (
  roleNumber: number,
  minimumRole: Role,
): boolean => {
  return roleNumber >= ROLE_NUMBER[minimumRole];
};
