import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { AuthorizeFrame } from '@/features/oauth';

const schema = z.object({
  client_id: z.string().min(1, 'client_id is required'),
});

const AuthorizePage = () => {
  return <AuthorizeFrame />;
};

export const Route = createFileRoute('/authorize')({
  component: AuthorizePage,
  validateSearch: schema,
});
