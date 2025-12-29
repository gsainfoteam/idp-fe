import { Navigate, createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { z } from 'zod';

import { useAuth } from '@/features/auth';
import { VerifyStudentIdFrame } from '@/features/profile';

function VerifyStudentIdPage() {
  const { user } = useAuth();
  const { redirect } = Route.useSearch();

  useEffect(() => {
    if (user?.isIdVerified && redirect) {
      window.location.href = redirect;
    }
  }, [user?.isIdVerified, redirect]);

  if (!user) {
    return null;
  } else if (user.isIdVerified) {
    return (
      <Navigate
        to={redirect ?? '/profile'}
        replace
        viewTransition={{ types: ['reload'] }}
      />
    );
  } else {
    return <VerifyStudentIdFrame />;
  }
}

export const Route = createFileRoute(
  '/_auth-required/profile/verify-student-id',
)({
  component: VerifyStudentIdPage,
  validateSearch: z.object({
    redirect: z.string().url().optional(),
  }),
});
