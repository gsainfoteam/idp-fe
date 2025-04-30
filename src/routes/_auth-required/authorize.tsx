import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { AuthorizeFrame, ScopeEnum } from '@/features/oauth';

const schema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  redirectUrl: z.string().url('Invalid redirect URL'),
  scope: z.array(ScopeEnum),
});

const AuthorizePage = () => {
  return <AuthorizeFrame />;
};

export const Route = createFileRoute('/_auth-required/authorize')({
  component: AuthorizePage,
  validateSearch: schema,
});
