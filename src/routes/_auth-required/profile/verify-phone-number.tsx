import { Navigate, createFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/features/auth';
import { VerifyPhoneNumberFrame } from '@/features/profile';

function VerifyPhoneNumberPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  } else if (user.isPhoneNumberVerified) {
    return (
      <Navigate to="/profile" replace viewTransition={{ types: ['reload'] }} />
    );
  } else {
    return <VerifyPhoneNumberFrame />;
  }
}

export const Route = createFileRoute(
  '/_auth-required/profile/verify-phone-number',
)({
  component: VerifyPhoneNumberPage,
});
