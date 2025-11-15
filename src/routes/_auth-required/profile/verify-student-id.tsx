import { createFileRoute } from '@tanstack/react-router';

import { VerifyStudentIdFrame } from '@/features/profile';

function VerifyStudentIdPage() {
  return <VerifyStudentIdFrame />;
}

export const Route = createFileRoute(
  '/_auth-required/profile/verify-student-id',
)({
  component: VerifyStudentIdPage,
});
