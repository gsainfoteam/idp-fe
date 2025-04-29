import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { RegisterDoneFrame } from '@/features/auth';

const schema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  redirectUrl: z.string().optional(),
});

const RegisterDonePage = () => {
  return <RegisterDoneFrame />;
};

export const Route = createFileRoute('/auth/register/done')({
  component: RegisterDonePage,
  validateSearch: schema,
});
