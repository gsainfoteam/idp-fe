import { Navigate, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { useAuth } from '@/features/auth';
import { VerifyStudentIdFrame } from '@/features/profile';

function VerifyStudentIdPage() {
  const { user } = useAuth();
  const { redirect } = Route.useSearch();

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
    redirect: z
      .string()
      .min(1, 'Redirect cannot be empty')
      .refine((val) => val.startsWith('/'), 'Redirect must be a relative path')
      .optional(),
  }),
});
