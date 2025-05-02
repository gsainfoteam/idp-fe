import { createFileRoute } from '@tanstack/react-router';

import { RegisterFrame } from '@/features/auth';

const RegisterPage = () => {
  return <RegisterFrame />;
};

export const Route = createFileRoute('/auth/register')({
  component: RegisterPage,
});
