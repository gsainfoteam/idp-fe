import { Navigate, createFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/features/auth';
import { VerifyStudentIdFrame } from '@/features/profile';

function VerifyStudentIdPage() {
  const { user } = useAuth();

  if (user && user.isIdVerified) {
    return (
      <Navigate to="/profile" replace viewTransition={{ types: ['reload'] }} />
    );
  } else {
    return <VerifyStudentIdFrame />;
  }
}

export const Route = createFileRoute(
  '/_auth-required/profile/verify-student-id',
)({
  component: VerifyStudentIdPage,
});
