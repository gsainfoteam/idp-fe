import { createFileRoute } from '@tanstack/react-router';

import { LoginFrame } from '@/features/auth';

const LoginPage = () => {
  return <LoginFrame />;
};

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});
