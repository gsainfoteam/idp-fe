import { type ClientScopeType } from '@/routes/_auth-required/authorize';

type UserWithVerification =
  | {
      isIdVerified: boolean;
      isPhoneNumberVerified: boolean;
    }
  | null
  | undefined;

export function checkRequiredScopeNotVerified(
  user: UserWithVerification,
  requiredScopes: readonly ClientScopeType[],
): boolean {
  if (!user) return true;
  if (requiredScopes.includes('student_id') && !user.isIdVerified) {
    return true;
  }
  if (requiredScopes.includes('phone_number') && !user.isPhoneNumberVerified) {
    return true;
  }
  return false;
}
