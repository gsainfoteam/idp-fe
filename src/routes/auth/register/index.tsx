import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { RegisterFrame } from '@/features/auth';

const schema = z.object({
  redirectUrl: z.string().optional(),
});

const RegisterPage = () => {
  return <RegisterFrame />;
};

export const Route = createFileRoute('/auth/register/')({
  component: RegisterPage,
  validateSearch: schema,
});
