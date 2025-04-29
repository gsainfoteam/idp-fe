import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { AuthorizeFrame } from '@/features/oauth';

const schema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  redirectUrl: z.string().optional(),
});

const AuthorizePage = () => {
  return <AuthorizeFrame />;
};

export const Route = createFileRoute('/authorize')({
  component: AuthorizePage,
  validateSearch: schema,
});
