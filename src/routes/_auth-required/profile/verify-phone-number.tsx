import { Navigate, createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { z } from 'zod';

import { useAuth } from '@/features/auth';
import { VerifyPhoneNumberFrame } from '@/features/profile';

function VerifyPhoneNumberPage() {
  const { user } = useAuth();
  const { redirect } = Route.useSearch();

  useEffect(() => {
    if (user?.isPhoneNumberVerified && redirect) {
      window.location.href = redirect;
    }
  }, [user?.isPhoneNumberVerified, redirect]);

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
    redirect: z.string().url().optional(),
  }),
});
