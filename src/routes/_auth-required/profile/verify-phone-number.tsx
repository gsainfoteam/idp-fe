import { Navigate, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { useAuth } from '@/features/auth';
import { VerifyPhoneNumberFrame } from '@/features/profile';

function VerifyPhoneNumberPage() {
  const { user } = useAuth();
  const { redirect } = Route.useSearch();

  if (!user) {
    return null;
  } else if (user.isPhoneNumberVerified) {
    return (
      <Navigate
        to={redirect ?? '/profile'}
        replace
        viewTransition={{ types: ['reload'] }}
      />
    );
  } else {
    return <VerifyPhoneNumberFrame />;
  }
}

export const Route = createFileRoute(
  '/_auth-required/profile/verify-phone-number',
)({
  component: VerifyPhoneNumberPage,
  validateSearch: z.object({
    redirect: z
      .string()
      .min(1, 'Redirect cannot be empty')
      .refine(
        (val) => val.startsWith('/') && !val.startsWith('//'),
        'Redirect must be a relative path',
      )
      .optional(),
  }),
});
