import { createFileRoute } from '@tanstack/react-router';

import { ChangePasswordFrame } from '@/features/core';

const ChangePasswordPage = () => {
  return <ChangePasswordFrame />;
};

export const Route = createFileRoute('/_auth-required/change-password')({
  component: ChangePasswordPage,
});
