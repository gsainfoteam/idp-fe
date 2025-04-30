import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { LoginFrame } from '@/features/auth';

const schema = z.object({
  redirectUrl: z.string().optional(),
});

const LoginPage = () => {
  return <LoginFrame />;
};

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
  validateSearch: schema,
});
